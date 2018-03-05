import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { DashboardComponent, ProfileComponent } from '.';
import { SharedModule } from '../shared';

@NgModule({
  // importing modules to get the availability in admin area 
  imports: [
    SharedModule,
    NgxPaginationModule
  ],
  // declaration of the components
  declarations: [
    DashboardComponent,
    ProfileComponent
  ],
  providers: [    
  ]
})
export class AdminModule {}
