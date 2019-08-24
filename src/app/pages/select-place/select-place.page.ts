import { CurrentUserService } from './../../services/current-user.service';
import { ActivityService } from './../../services/activity.service';
import { RouteLocations } from './../../dtos/route-locations';
import { NavController } from '@ionic/angular';
import { LocationService } from './../../services/location.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Component, OnInit } from '@angular/core';
import { CommandResourceService, QueryResourceService } from 'src/app/api/services';
import { log } from 'util';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-select-place',
  templateUrl: './select-place.page.html',
  styleUrls: ['./select-place.page.scss'],
})
export class SelectPlacePage implements OnInit {
 fromPlaceId = '';

 boo: Boolean = true;
taskid = '';
 toPlaceId = '';
 currentSearchBar = '';
 routeLocation: RouteLocations = new RouteLocations;
 predictions: any = [{description: 'no match'}];
  lon: number;
  lat: number;
  constructor(private geoLocation: Geolocation,
              private locationService: LocationService,
              private navController: NavController,
              private commandResource: CommandResourceService,
              private queryResource: QueryResourceService,
              private activityService: ActivityService,
              private util: UtilService,
              private currentUserService: CurrentUserService) { }

  ngOnInit() {
   this.currentLocation();
  }

  currentLocation() {
    this.geoLocation.getCurrentPosition().then((resp) => {
            this.lat = resp.coords.latitude;
            this.lon = resp.coords.longitude;
            this.lat = 10.7800499;
            this.lon = 76.5231953;
    //  alert(resp.coords.latitude);
            this.locationService.getAddressFromLatLon(this.lat, this.lon).then((result: any) => {

      console.log('sucess geting location ', result);
      if (result.status !== 'OVER_QUERY_LIMIT') {
      this.routeLocation.fromAddress = result.results[0].formatted_address;
      }
    }, err => {
      console.log('error while geting location', err);

    });

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  selectLocation(location: any) {
    this.boo = !this.boo;
    console.log('# selected location ', location.place_id);
    if (this.currentSearchBar === 'from') {
      this.routeLocation.fromAddress = location.description;
      this.fromPlaceId = location.place_id;
    } else {
      this.routeLocation.toAddress = location.description;
      this.toPlaceId = location.place_id;
    }


    console.log(this.routeLocation.fromAddress, this.routeLocation.toAddress, ' selected locations #');

  }



  getLocationPrediction(event: any, searchBar: string) {
    this.util.createLoader()
      .then(loader => {
    this.currentSearchBar = searchBar;
    console.log('evnet is 2', event.detail.value);

    this.locationService.getAdressPredictions(event.detail.value).subscribe((result: any) => {
      console.log('result is locations ', result);
      this.predictions = result;
      loader.dismiss();
     },
     err => {
      console.log('error is ', err);
      loader.dismiss();
     }
     );
    });
  }

go() {
  this.util.createLoader()
  .then(loader => {
  console.log('intiating workflow');
  // tslint:disable-next-line: max-line-length
  this.commandResource.initateWorkflowUsingPOST().subscribe(
    result => {
      console.log('sucessfuly started workflow with proces instance id', result);
      this.activityService.setProcessInstanceId(result);
      this.getTask(result);
      loader.dismiss();
    },
    err => {
      console.log('error starting workflow ', err);
      loader.dismiss();
    }
  );
  });



}

getTask(processInstanceId: string) {
  this.util.createLoader()
  .then(loader => {
  this.queryResource.getTasksUsingGET({processInstanceId}).subscribe(
    (result: any) => {
        console.log('sucess geting task', result);
        console.log('task id ', result.data[0].id);
        this.collectLocation(result.data[0].id);
        loader.dismiss();
    }, err => {
        console.log('error geting task', err);
        loader.dismiss();
    }
  );
  });
}

  collectLocation(taskId: string) {
    this.util.createLoader()
    .then(loader => {
      loader.present();
      console.log('route location', this.routeLocation);
      this.currentUserService.setRoute(this.routeLocation);
      this.commandResource.collectRiderLocationDetailsUsingPOST({taskId, defaultInfoRequest: {destination: this.routeLocation.toAddress,
    pickUp: this.routeLocation.fromAddress}}).subscribe(
      (result: any) => {
        console.log('sucess giving location info', result);
        this.navController.navigateForward('/ride');
        loader.dismiss();

      },
      err => {
        console.log('error giving location info', err);
        loader.dismiss();

      }
    );
    });
  }
  geoCodeAdress() {
    this.locationService.geocodeAddress(this.fromPlaceId).then(
      result2 => {
        console.log('#got log lat from place id', result2);
        this.locationService.geocodeAddress(this.toPlaceId).then(
          result3 => {
            console.log('#got log lat from place id', result3);

           }, err => {
            console.log('#error geting log lat from place id', err);

           });
       }, err => {
        console.log('#error geting log lat from place id', err);

       });
  }

}
