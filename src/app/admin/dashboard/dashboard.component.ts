import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { UserService, User } from '../../shared';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;
  p: number = 1;
  perpage = 5;

  @ViewChild('fileInput') fileInput;
  amazonLink: string = '';
  isSubmitting:boolean = false;
  files: [any];

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    // getting login user info to show on dashboard page
    this.user = this.userService.getCurrentUser();
    this.getFiles();
  }

  getFiles(){
    this.userService.getS3files()
    .subscribe(
      data => this.files = data,
      err => console.log(err)
    );
  }

  upload(){
    this.isSubmitting = true;
    this.amazonLink = '';
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append("image", fileBrowser.files[0]);
      this.userService.uploadFileToS3(formData)
        .subscribe(
          data => {
            this.fileInput.nativeElement.value = '';
            const image = data.imageDetails;
            this.files.push(image);
            this.amazonLink = image.url;
            this.isSubmitting = false;
          },
          err => {
            console.log(err);
            this.isSubmitting = false;
          }
        );
    }
    else{
      alert('Please select file.')
      this.isSubmitting = false;
    }
  }
}
