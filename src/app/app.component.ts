import { Component } from '@angular/core';

import { Platform, ToastController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { JwksValidationHandler, OAuthService, AuthConfig } from 'angular-oauth2-oidc';


export const authConfig: AuthConfig = {
  issuer: 'http://35.225.108.188:8020/auth/realms/RedAlert',
  redirectUri: window.location.origin,
  clientId: 'account',
  scope: 'openid profile email',
  dummyClientSecret: '696583a4-a141-4b51-bf60-51371d121168',
  tokenEndpoint: 'http://35.225.108.188:8020/auth/realms/RedAlert/protocol/openid-connect/token',
  userinfoEndpoint: 'http://35.225.108.188:8020/auth/realms/RedAlert/protocol/openid-connect/userinfo',
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
