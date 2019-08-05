import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-driver-detials',
  templateUrl: './driver-detials.component.html',
  styleUrls: ['./driver-detials.component.scss'],
})
export class DriverDetialsComponent implements OnInit {

  constructor(private modalCtrl:ModalController,
    private navCtrl:NavController) { }

  ngOnInit() {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  liveWatch()
  {
    console.log('live watch method click');
    this.navCtrl.navigateForward('/ride-status');
    this.dismiss();

  }

}
