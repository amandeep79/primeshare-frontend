import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private http: Http,
    private jwtService: JwtService
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user')
      .subscribe(
        data => this.setAuth(data.user),
        err => this.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  // method for login or register new user, based on type sent in parameter
  attemptAuth(type, credentials): Observable<User> {
    const route = (type === 'login') ? '/login' : '/register';
    return this.apiService.post( route, credentials )
    .map(
      data => {
        this.setAuth(data.user);
        return data;
      }
    );
  }

  // method to get the current login user details
  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  //method to get user details from back end server by sending user id
  getUser(userId): Observable<User>{
    return this.apiService.get('/user/' + userId)
      .map(
        data => { return data.user; }
      )
  }

  // Update the user on the server (email, pass, etc)
  update(user, userId): Observable<User> {
    return this.apiService
    .put('/user/' + userId, { user })
    .map(data => {
      // Update the currentUser observable
      this.currentUserSubject.next(data.user);
      return data.user;
    });
  }

  // upload image on server
  uploadImage(formData): Observable<any> {
    return this.apiService.files('/fileUpload', formData).map(
      data => {
        return data;
      })
  }

  // upload image on s3
  uploadFileToS3(formData): Observable<any> {
    return this.apiService.files('/fileUploadToS3', formData).map(
      data => {
        return data;
      })
  }

  //method to get s3 files
  getS3files(): Observable<any>{
    return this.apiService.get('/s3')
      .map(
        data => { return data.items; }
      )
  }

}
