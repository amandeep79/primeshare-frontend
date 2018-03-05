import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models';
import { UserService } from '../services';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    // this.userService.currentUser.subscribe(
    //   (userData) => {
    //     this.currentUser = userData;
    //   }
    // )
  }

  // method for logout button
  logout() {
    this.userService.purgeAuth();            // removing user from local storage
    this.router.navigateByUrl('/login');     // navigate to login page
  }
}
