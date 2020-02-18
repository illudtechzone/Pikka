import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CommandResourceService } from 'src/app/api/services';
import { DriverDTO } from 'src/app/api/models';

@Component({
  selector: 'app-driver-detials',
  templateUrl: './driver-detials.component.html',
  styleUrls: ['./driver-detials.component.scss'],
})
export class DriverDetialsComponent implements OnInit {
name: string;
@Input()
driverId: any;
driverDto: DriverDTO={};

  constructor(private modalCtrl: ModalController,
              private navCtrl: NavController,
              private commandResourceService: CommandResourceService) { }

  ngOnInit() {

    this.driverDto.iDPcode=this.driverId;
    this.commandResourceService.createDriverIfNotExistUsingPOST(this.driverDto).subscribe(data=>{
      this.driverDto=data;
      this.name=this.driverDto.iDPcode;
    })




  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
  liveWatch() {
    console.log('live watch method click');
    this.navCtrl.navigateForward('/ride-status');
    this.dismiss();

  }

}
