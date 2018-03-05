import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'app/home/home.component';
import { HomeAuthResolver } from 'app/home/home-auth-resolver.service';
import { AuthComponent } from 'app/auth/auth.component';
import { NoAuthGuard } from 'app/auth/no-auth-guard.service';
import { AuthGuard } from 'app/shared';
import { DashboardComponent, ProfileComponent } from './admin';

// routing for all the urls and defining which pages will load for anonymous and others for authorized
const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', resolve: { isAuthenticated: HomeAuthResolver } },
  { path: 'login', component: AuthComponent, pathMatch: 'full', canActivate: [NoAuthGuard] },
  { path: 'register', component: AuthComponent, pathMatch: 'full', canActivate: [NoAuthGuard] },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  // { path: 'profile', component: ProfileComponent, pathMatch: 'full', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, { useHash: true }),
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
