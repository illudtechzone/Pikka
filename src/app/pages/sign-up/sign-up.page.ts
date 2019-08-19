import { KeycloakService } from './../../services/security/keycloak.service';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { KeycloakAdminClient } from 'keycloak-admin/lib/client';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

 firstName: string;
  username: string;
  password: string;
  email: string;

  ngOnInit(): void {

  }

  constructor(private navCtrl: NavController, private util: UtilService,
              private keycloakService: KeycloakService) {

  }
  signup() {
    this.util.createLoader()
      .then(loader => {
        loader.present();
        const user = { username: this.username, email: this.email };
        this.keycloakService.createAccount(user, this.password,
          (res) => {
            loader.dismiss();
            this.navCtrl.navigateForward('/login');
          },
          (err) => {
            loader.dismiss();
            if (err.response.status === 409) {
              this.util.createToast('User Already Exists');
            } else {
              this.util.createToast('Cannot Register User. Please Try Later');
            }
          });
          // Remove this later
        });
  }







  // constructor(private navCtrl: NavController, private toastController: ToastController, private oauthService: OAuthService) {
  //   this.kcAdminClient = new KeycloakAdminClient();
  //   this.kcAdminClient.setConfig({
  //     baseUrl: 'http://34.74.192.113:8888/auth'
  //   });
  //   this.configureKeycloakAdmin();
  // }
  // firstName: string;
  // username: string;
  // password: string;
  // email: string;
  // kcAdminClient: KeycloakAdminClient;
  // phone: number;
  // agreement: boolean;

  // configureKeycloakAdmin() {
  //   this.kcAdminClient.auth({
  //     username: 'admin',
  //     password: 'karma123',
  //     grantType: 'password',
  //     clientId: 'admin-cli',
  //     clientSecret: '7f8a027d-36dd-48fa-b09b-b26762029aa1',
  //   });
  // }

  // signup() {
  //   console.log('sign up started');
  //   const map = new Map([
  //     ['phone', this.phone],
  //     ['value', 3]
  //   ]);

  //   this.kcAdminClient.users.create({
  //     realm: 'RedAlert',
  //     username: this.username,
  //     email: this.email,
  //     enabled: true,
  //     credentials: [{
  //       type: 'password',
  //       value: this.password
  //     }],
  //     attributes: map

  //   }).then(res => {
  //     this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(this.username, this.password, new HttpHeaders()).then(() => {
  //       const claims = this.oauthService.getIdentityClaims();
  //       if (claims) { console.log(claims); }
  //       if (this.oauthService.hasValidAccessToken()) {
  //         this.presentToast('Signup successfully completed');
  //         // this.navCtrl.navigateRoot('/sale');
  //         console.log(this.username);
  //       }
  //     }).catch((err: HttpErrorResponse) => {
  //       this.presentToast(err.error.error_description);
  //     });
  //     this.navCtrl.navigateForward('/doc-upload');
  //   }, err => {
  //     console.log(err);
  //     this.presentToast('user already exists');
  //   });
  // }

  // dataChanged(agreement) {
  //   console.log('Old Agreement is ' + this.agreement);

  //   console.log('Agreement is ' + agreement);
  //   this.agreement = agreement;

  // }

  // async presentToast(message) {
  //   const toast = await this.toastController.create({
  //     message: message,
  //     duration: 2000,
  //     cssClass: 'toast'
  //   });
  //   await toast.present();
  // }

  // ngOnInit() {
  //   this.agreement = false;
  // }
}


