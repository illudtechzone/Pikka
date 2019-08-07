import { NavController } from '@ionic/angular';
import { LocationService } from './../../services/location.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-place',
  templateUrl: './select-place.page.html',
  styleUrls: ['./select-place.page.scss'],
})
export class SelectPlacePage implements OnInit {
 currentAdress = '';
 destination = '';
 predictions : any =[{description:'no match'}];
  lon: number;
  lat: number;
  constructor(private geoLocation: Geolocation,
              private locationService: LocationService,
              private navController: NavController) { }

  ngOnInit() {
   this.currentLocation();
  }
  currentLocation() {
    this.geoLocation.getCurrentPosition().then((resp) => {
            this.lat = predictionsresp.coords.latitude;
            this.lon = resp.coords.longitude;
            this.lat = 10.7800499;
            this.lon = 76.5231953;
    //  alert(resp.coords.latitude);
            this.locationService.getAddress(this.lat, this.lon).subscribe((result: any) => {

      console.log('sucess geting location ', result);
      if (result.status !=='OVER_QUERY_LIMIT') {
      this.currentAdress = result.results[0].formatted_address;
      }
    }, err => {
      console.log('error while geting location', err);

    });

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  selectLocation() {
    this.navController.navigateForward('/ride');
  }

  getLocationPrediction(event: any) {
    console.log('evnet is ', event);
    console.log('evnet is ', event.detail.value);
    this.locationService.getPredictions(event.detail.value).subscribe((result: any) => {
      console.log('result is ', result);
      this.predictions = result;
     },
     err => {
      console.log('error is ', err);
     }
     );
  }


}
