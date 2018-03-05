import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeAuthResolver } from './home-auth-resolver.service';
import { SharedModule } from '../shared';

@NgModule({
  // importing modules to get the availability on home page
  imports: [
    SharedModule
  ],
  // declaration of the components
  declarations: [
    HomeComponent
  ],
  // providers for services
  providers: [
    HomeAuthResolver
  ]
})
export class HomeModule {}
