import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DriverDetialsComponent } from 'src/app/components/driver-detials/driver-detials.component';

@Component({
  selector: 'app-ride-status',
  templateUrl: './ride-status.page.html',
  styleUrls: ['./ride-status.page.scss'],
})
export class RideStatusPage implements OnInit {

  constructor(private modalController:ModalController) { }

  ngOnInit() {
  }
  async presentModal() {
    console.log('koiii');
    const modal = await this.modalController.create({
      component: DriverDetialsComponent,
    });
    return await modal.present();
  }

}