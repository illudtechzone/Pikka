import { KeycloakAdminClient } from 'keycloak-admin/lib/client';
import { Injectable } from '@angular/core';


@Injectable()
export class KeycloakAdminConfig {


    kcAdminClient: KeycloakAdminClient;

    constructor() {
      this.kcAdminClient = new KeycloakAdminClient();
      this.kcAdminClient.setConfig({
        baseUrl: 'http://dev.servers.divisosofttech.com:8888/auth'
      });
    }

    refreshClient() {
      return this.configureKeycloakAdmin();
    }

    configureKeycloakAdmin() {
     return  this.kcAdminClient.auth({
        username: 'admin',
        password: 'admin999',
        grantType: 'password',
        clientId: 'admin-cli',
        clientSecret: '7f8a027d-36dd-48fa-b09b-b26762029aa1'
      });
    }
}

