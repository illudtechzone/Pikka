import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  user: any;
  constructor(private oathservice: OAuthService) {}
  getCurrentUser(force: Boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.user == null || force) {
        this.oathservice.loadUserProfile().then(
          (result: any) => {
            console.log('sucess get user profile ', result);
            this.user = result;
            resolve(this.user);
          },
          err => {
            console.log('error getting user profile ', err);
          }
        );

      } else {
        resolve(this.user);
      }
    });
  }
}
