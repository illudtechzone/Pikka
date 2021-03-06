import { Component } from '@angular/core';

import { Platform, ToastController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { JwksValidationHandler, OAuthService, AuthConfig } from 'angular-oauth2-oidc';


export const authConfig: AuthConfig = {
  issuer: 'http://34.74.192.113:8888/auth/realms/RedAlert',
  redirectUri: window.location.origin,
  clientId: 'account',
  scope: 'openid profile email',
  dummyClientSecret: 'de33f012-48fc-43c0-bf57-c2472a61a614',
  tokenEndpoint: 'http://34.74.192.113:8888/auth/realms/RedAlert/protocol/openid-connect/token',
  userinfoEndpoint: 'http://34.74.192.113:8888/auth/realms/RedAlert/protocol/openid-connect/userinfo',
  oidc: false,
  requireHttps: false


};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Profile',
      url: '/profile',
      icon: 'contact'
    },

    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },

    {
      title: 'Logout',
      url: '/',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oauthService: OAuthService,
    private toastController: ToastController,
    private navCtrl: NavController,
  ) {
    this.initializeApp();
    this.configureOAuth();
  }
  logout() {
    console.log('Logout clicked');
    this.oauthService.logOut();
    this.presentToastLogout();
    this.navCtrl.navigateRoot('/login');
  }
    async presentToastLogout() {
    const toast = await this.toastController.create({
      message: 'You\'ve been successfully logout',
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast'
    });
    toast.present();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  configureOAuth(): any {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    // Load Discovery Document and then try to login the user
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
