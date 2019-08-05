import { DriverDetialsComponent } from './../../components/driver-detials/driver-detials.component';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RideStatusPage } from './ride-status.page';

const routes: Routes = [
  {
    path: '',
    component: RideStatusPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RideStatusPage]
  ,
  entryComponents:[DriverDetialsComponent]
})
export class RideStatusPageModule {}
