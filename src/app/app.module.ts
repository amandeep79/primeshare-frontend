import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import {
  ApiService,
  AuthGuard,
  FooterComponent,
  HeaderComponent,
  JwtService,
  SharedModule,
  UserService
} from './shared';
import { AppRoutingModule } from 'app/app-routing.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  // declaration of the components
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  // importing modules to get the availability in complete app 
  imports: [
    BrowserModule,
    AuthModule,
    HomeModule,
    AdminModule,
    AppRoutingModule,
    SharedModule,
  ],
  // providers for services
  providers: [
    ApiService,
    AuthGuard,
    JwtService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
