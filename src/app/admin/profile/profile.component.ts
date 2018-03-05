import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService, User, Errors } from '../../shared';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  user: User;
  userForm: FormGroup;
  isSubmitting = false;
  errors: Errors = new Errors();
  message: string = '';
  apiUrl = environment.api_url;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    // initializing user form controls
    this.userForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email])],
      username: ['', [Validators.required]],
      phone: [''],
      address: [''],
      picture: ['']
    });
    // getting login user and populating the fields with saved data
    this.user = this.userService.getCurrentUser();
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  // method to update profile on update click
  updateUser() {
    this.errors = new Errors();       // removing error message
    this.isSubmitting = true;         // disabling fields while submitting data to server
    let fileBrowser = this.fileInput.nativeElement;
    // save image to server if file selected else update only fields data
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append("image", fileBrowser.files[0]);
      this.userService.uploadImage(formData)
        .subscribe(
          data => {
            this.fileInput.nativeElement.value = '';
            const image = data.imageDetails;
            this.userForm.patchValue({
              picture: image.url,
            });
            this.updateProfile();
          },
          err => {
            this.isSubmitting = false;  // enabling fields again
            this.errors = err;
          }
        );
    }
    else {
      this.updateProfile();
    }
  }

  // method to update fields data to server
  updateProfile() {
    const updatedUser = this.userForm.value;
    this.userService
      .update(updatedUser, this.user._id)
      .subscribe(
        data => {
          this.isSubmitting = false;   //enabling fields again
          this.message = 'Profile updated';
          // remove 'Profile updated' message after 3 seconds
          setTimeout(() => {
            this.message = '';
          }, 3000);
        },
        err => {
          this.errors = err;
          this.isSubmitting = false;  // enabling fields again
        }
      );
  }
}
