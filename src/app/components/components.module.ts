import { DriverDetialsComponent } from './driver-detials/driver-detials.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { RatingComponent } from './rating/rating.component';



@NgModule({
  declarations: [VehiclesListComponent,RatingComponent,DriverDetialsComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
  ],
  exports:[VehiclesListComponent,RatingComponent,DriverDetialsComponent]
})
export class ComponentsModule { }
