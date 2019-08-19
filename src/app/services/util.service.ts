import { Injectable } from '@angular/core';
import {
  LoadingController,
  ToastController,
  NavController
} from '@ionic/angular';
@Injectable()
export class UtilService {
  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private navController: NavController
  ) {}

  async createLoader() {
    return await this.loadingController.create({
      spinner: 'bubbles'
    });
  }

  createToast(msg: string, iconName?: string) {
    this.toastController
      .create({
        message: msg,
        duration: 2000,
        color: 'dark',
        position: 'bottom',
        showCloseButton: true,
        keyboardClose: true,
        buttons: [
          {
            side: 'start',
            icon:
              iconName !== undefined ? iconName : 'information-circle-outline'
          }
        ]
      })
      .then(data => {
        data.present();
      });
  }

  navigateRoot() {
    this.navController.navigateRoot('');
  }

  navigateToLogin() {
    this.navController.navigateRoot('login');
  }
}