import { SecurityService } from './services/security.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [SecurityService]
  },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule' },
  { path: 'invoice', loadChildren: './pages/invoice/invoice.module#InvoicePageModule' },
  { path: 'select-place', loadChildren: './pages/select-place/select-place.module#SelectPlacePageModule' },
  { path: 'ride', loadChildren: './pages/ride/ride.module#RidePageModule' },
  { path: 'ride-status', loadChildren: './pages/ride-status/ride-status.module#RideStatusPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
