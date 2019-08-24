import { RouteLocations } from './../dtos/route-locations';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  user: any;
  routeLocation: RouteLocations = new RouteLocations();

  constructor(private oathservice: OAuthService) {}

  getCurrentUser(force: boolean): Promise<any> {
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

  setRoute(route:any){

    this.routeLocation=route;

  }
  getRoute():any{
    return this.routeLocation;
  }

}
