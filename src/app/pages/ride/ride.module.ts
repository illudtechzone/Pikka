import { DriverDetialsComponent } from 'src/app/components/driver-detials/driver-detials.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RidePage } from './ride.page';
import { VehiclesListComponent } from 'src/app/components/vehicles-list/vehicles-list.component';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: RidePage
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
  declarations: [RidePage],
  entryComponents: [VehiclesListComponent,DriverDetialsComponent]
})
export class RidePageModule {}
