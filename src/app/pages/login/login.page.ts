import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  username: string;
  password: string;
  constructor(private oauthService: OAuthService, private navCtrl: NavController, private toastController: ToastController) { }

  ngOnInit() {
    if (this.oauthService.hasValidAccessToken()) {
      this.navCtrl.navigateRoot('/home');
    }
  }
  login() {
    console.log('in login' + this.username + ' password is ' + this.password);
    this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(this.username, this.password, new HttpHeaders()).then(result => {
      const claims = this.oauthService.getIdentityClaims();
      if (claims) { console.log(claims); }
      if (this.oauthService.hasValidAccessToken()) {
        this.presentToast('Logged in successfully');
        this.navCtrl.navigateRoot('/home');
      }
    },
    err=>{
      this.presentToast('An error occured');
      console.log('error while logging ');
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      cssClass: 'toast'
    });
    toast.present();
  }
}
