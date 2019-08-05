import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMap, Environment, GoogleMapOptions, GoogleMaps, Marker, GoogleMapsEvent} from '@ionic-native/google-maps';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  status: Boolean = false;
mapCanvas: GoogleMap;
lat = 10.754090;
lon = 76.547018;
  constructor(private geoLocation: Geolocation,
              private navController: NavController) {}

  ionViewWillEnter() {
    console.log('ion view will enter method');
    this.currentLocation();
    }
    currentLocation() {
      this.geoLocation.getCurrentPosition().then((resp) => {

        this.lat = resp.coords.latitude;
        this.lon = resp.coords.longitude;
      //  alert(resp.coords.latitude);
        this.showMap();

       }).catch((error) => {
         console.log('Error getting location', error);
       });
    }
    showMap() {

        // This code is necessary for browser
      console.log('loadMap');

      Environment.setEnv({
          API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAwC9dPmp280b4C18RBcGWjInRi9NGxo5c',
          API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAwC9dPmp280b4C18RBcGWjInRi9NGxo5c'
        });
      const mapOptions: GoogleMapOptions = {
          camera: {
            target: {
              lat: this.lat,
              lng: this.lon
            },
            zoom: 14,
            tilt: 30
          }
        };
      this.mapCanvas = GoogleMaps.create('map_canvas', mapOptions);
      const marker: Marker = this.mapCanvas.addMarkerSync({
      title: 'newyork city',
      icon : 'red',
      animation: 'DROP',
      position: {
        lat: this.lat,
        lng: this.lon,

      }
    });
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
      }
      search() {
        console.log('searching ');
        this.navController.navigateForward('/select-place');
      }
}
