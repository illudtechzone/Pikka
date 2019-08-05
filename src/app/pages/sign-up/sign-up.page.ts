import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { KeycloakAdminClient } from 'keycloak-admin/lib/client';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(private navCtrl: NavController, private toastController: ToastController, private oauthService: OAuthService) {
    this.kcAdminClient = new KeycloakAdminClient();
    this.kcAdminClient.setConfig({
      baseUrl: 'http://35.225.108.188:8020/auth'
    });
    this.configureKeycloakAdmin();
  }
  firstName: string;
  username: string;
  password: string;
  email: string;
  kcAdminClient: KeycloakAdminClient;
  phone: number;
  agreement: boolean;

  configureKeycloakAdmin() {
    this.kcAdminClient.auth({
      username: 'admin',
      password: 'admin',
      grantType: 'password',
      clientId: 'admin-cli'
    });
  }

  signup() {
    const map = new Map([
      ['phone', this.phone],
      ['value', 3]
    ]);

    this.kcAdminClient.users.create({
      realm: 'RedAlert',
      username: this.username,
      email: this.email,
      enabled: true,
      credentials: [{
        type: 'password',
        value: this.password
      }],
      attributes: map

    }).then(res => {
      this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(this.username, this.password, new HttpHeaders()).then(() => {
        const claims = this.oauthService.getIdentityClaims();
        if (claims) { console.log(claims); }
        if (this.oauthService.hasValidAccessToken()) {
          this.presentToast('Signup successfully completed');
          // this.navCtrl.navigateRoot('/sale');
          console.log(this.username);
        }
      }).catch((err: HttpErrorResponse) => {
        this.presentToast(err.error.error_description);
      });
      this.navCtrl.navigateForward('/doc-upload');
    }, err => {
      console.log(err);
      this.presentToast('user already exists');
    });
  }

  dataChanged(agreement) {
    console.log('Old Agreement is ' + this.agreement);

    console.log('Agreement is ' + agreement);
    this.agreement = agreement;

  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      cssClass: 'toast'
    });
    await toast.present();
  }

  ngOnInit() {
    this.agreement = false;
  }
}


