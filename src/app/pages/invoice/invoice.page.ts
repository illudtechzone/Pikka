import { CurrentUserService } from './../../services/current-user.service';
import { NavController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';
import { NavComponent } from '@ionic/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {
  processInstanceId =  '18710';
  route:any;
  constructor(private queryResourceService: QueryResourceService,
              private util: UtilService,
              private commandResourceService: CommandResourceService,
              private navCtrl:NavController,
              private currentUserService:CurrentUserService) { }

  ngOnInit() {
    this.route=this.currentUserService.getRoute();
  }

  sent() {
this.getTask();


  }

  getTask() {
    this.util.createLoader()
    .then(loader => {
    this.queryResourceService.getTasksUsingGET({processInstanceId:this.processInstanceId}).subscribe(
      (result: any) => {
          console.log('sucess geting task', result);
          console.log('task id ', result.data[0].id);
          loader.dismiss();
          this.sentReview(result.data[0].id);
      }, err => {
          console.log('error geting task', err);
          loader.dismiss();
      }
    );
    });

  }
  sentReview(taskId: string) {
    this.commandResourceService.rateAndReviewUsingPOST({taskId, rateAndReview: {trackingId: ''}}).subscribe(
      (result: any) => {
          console.log('sucess rating and review', result);
          this.navCtrl.navigateForward('/home');
      }, err => {
          console.log('error geting task', err);
      }
    );

  }

}
