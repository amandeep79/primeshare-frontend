import { Component, OnInit } from '@angular/core';

import { UserService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor (
    private userService: UserService
  ) {}

  ngOnInit() {
    // this hits only at the very first opening or at hard refresh of app in browser
    this.userService.populate();
  }
}
