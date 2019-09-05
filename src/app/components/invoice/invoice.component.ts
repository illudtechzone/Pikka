import { LocationService } from './../../services/location.service';
import { CurrentUserService } from './../../services/current-user.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Invoice } from 'src/app/dtos/invoice';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {


  constructor(private currentUserService: CurrentUserService,
              private  modalCtrl: ModalController,
              private locationService:LocationService) { }
  invoice: Invoice =new Invoice();
  ngOnInit() {
    const route = this.currentUserService.getRoute();
    this.invoice.pickupAddress = route.fromAddress;
    this.invoice.destAddress = route.toAddress;
    this.invoice.distance = route.distance;
    console.log('4>>',route.distance);
    console.log('1>>',(this.invoice.distance.split(' ')[0]));
    console.log('2>>',(parseFloat((this.invoice.distance.split(' ')[0])) * 2));
    console.log('3>>',this.invoice.distance);
    this.invoice.totel = parseFloat((this.invoice.distance.split(' ')[0])) * 2+'';
  }


  dismiss(response:string) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true,
      response: response
    });
  }



}