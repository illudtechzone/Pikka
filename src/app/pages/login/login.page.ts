import { UtilService } from './../../services/util.service';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { KeycloakService } from 'src/app/services/security/keycloak.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  username: string;
  password: string;
  constructor(private oauthService: OAuthService,
              private navCtrl: NavController,
              private toastController: ToastController,
              private util: UtilService,
              private keycloakService: KeycloakService) { }

  ngOnInit() {
    if (this.oauthService.hasValidAccessToken()) {
      this.navCtrl.navigateRoot('/home');
    }
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      cssClass: 'toast'
    });
    toast.present();
  }
  login() {
    this.util.createLoader()
      .then(loader => {
        loader.present();
        this.keycloakService.authenticate({ username: this.username, password: this.password },
          () => {
            loader.dismiss();
            console.log('slsklkslkks');
            this.navCtrl.navigateForward('/home');
          },
          () => {
            loader.dismiss();
            this.util.createToast('Invalid Username or Password');
          });
      });
  }

}
