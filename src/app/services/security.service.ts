import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  constructor(private oauthService: OAuthService, private router: Router, private navController: NavController) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('Check has vaildIdToken '+ this.oauthService.hasValidIdToken());
    if (this.oauthService.hasValidAccessToken()) {
      console.log('Check has vaildAcessToken '+ this.oauthService.hasValidAccessToken());

      return true;
    }

    this.navController.navigateRoot('/login');
    return false;
  }
}
