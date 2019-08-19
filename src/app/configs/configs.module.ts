import { OAuthModule } from 'angular-oauth2-oidc';
import { KeycloakAdminConfig } from './keycloak.admin.config';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardConfig } from './auth.guard.config';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AuthGuardConfig , KeycloakAdminConfig],
})
export class ConfigsModule {

  constructor(
    private authGuardConfig: AuthGuardConfig ,
    private keyCloakConfig: KeycloakAdminConfig
  ) {}
}
