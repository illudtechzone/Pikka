import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VehiclesListComponent } from 'src/app/components/vehicles-list/vehicles-list.component';
import { DriverDetialsComponent } from 'src/app/components/driver-detials/driver-detials.component';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {

  isRequest:boolean=false;
  constructor(private modalController:ModalController) { }
  vehicleList:boolean=true;
  ngOnInit() {
  }


  async presentModal() {
    console.log('koiii');
    const modal = await this.modalController.create({
      component: DriverDetialsComponent,
    });
    return await modal.present();
  }
  changeFooter()
  {
    this.vehicleList=!this.vehicleList;
  }
  requestVehicle(){
    this.isRequest=!this.isRequest;
    this.presentModal();
  }
}

