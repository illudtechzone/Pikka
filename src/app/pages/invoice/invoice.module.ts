import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InvoicePage } from './invoice.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { RatingComponent } from 'src/app/components/rating/rating.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicePage
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InvoicePage],
  entryComponents:[RatingComponent]
})
export class InvoicePageModule {}
