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
  lon: number;
  lat: number;
  constructor(private geoLocation: Geolocation,
              private locationService: LocationService,
              private navController:NavController) { }

  ngOnInit() {
   this.currentLocation();
  }
  currentLocation() {
    this.geoLocation.getCurrentPosition().then((resp) => {
            this.lat = resp.coords.latitude;
            this.lon = resp.coords.longitude;
      // this.lat = 10.7800499;
      // this.lon = 76.5231953;
    //  alert(resp.coords.latitude);
            this.locationService.getAddress(this.lat, this.lon).subscribe((result: any) => {
      console.log('sucexsdfdfd>>>>>>xsss', result.results[0].address_components[0].long_name);
      console.log('sucexsdfdfd>>>>>>xsss', result);
      this.currentAdress = result.results[0].formatted_address;
    }, err => {
      console.log('sucerrorxxsss', err);

    });

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  selectLocation()
  {
    this.navController.navigateForward('/ride');
  }


}
