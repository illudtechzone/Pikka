import { Injectable } from '@angular/core';
import { DriverDTO } from '../api/models';
import { CommandResourceService, QueryResourceService } from '../api/services';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  driverUserName: any;
  isAccepted = false;
  driverCompleted=false;
  driver: DriverDTO = {};
  constructor(private queryResource: QueryResourceService, private commandResource: CommandResourceService) {
  }

  clearDriverDetails() {
    this.driverUserName = undefined;
    this.isAccepted = false;
    this.driver = undefined;
    this.driverCompleted=false;
  }
  addDriverDetails(idpCode) {
  this.driver.iDPcode = idpCode;
  this.commandResource.createDriverIfNotExistUsingPOST( this.driver).toPromise().then(
    data => {

      this.driver = data;
      this.isAccepted = true;
      this.driverUserName=this.driver.iDPcode;
    }).catch(
      err => {
        console.log('Error while fetching the driver details');
      }
    );
}

  }



