import { QueryResourceService } from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { DriverDetialsComponent } from 'src/app/components/driver-detials/driver-detials.component';
import { GoogleMap, Environment, GoogleMapOptions, GoogleMaps, Marker, GoogleMapsEvent } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {

  isRequest = false;

  isVehicleList = true;
  mapCanvas: GoogleMap;
  lat = 10.754090;
  lon = 76.547018;
  vehiclesList: any[] = [];

  constructor(private geoLocation: Geolocation,
              private navController: NavController,
              private modalController: ModalController,
              private quryResource: QueryResourceService) {}
  ngOnInit() {
  }


  async presentModal() {
    console.log('koiii');
    const modal = await this.modalController.create({
      component: DriverDetialsComponent,
    });
    return await modal.present();
  }
  changeFooter() {
    this.isVehicleList = !this.isVehicleList;
  }
  requestVehicle() {
    this.isRequest = !this.isRequest;

    this.presentModal();
  }
  // map code start



  ionViewWillEnter() {
    console.log('ion view will enter method');
    this.currentLocation();
    this.getCordinates();


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

  getVehicles() {

   const latlon = this.lat + ',' + this.lon;
   this.quryResource.searchByNearestLocationUsingGET({latLon: latlon, kiloMeter: 5, size: 5}).subscribe(
      (result: any) => {
        console.log('GOT NEAREST DRIVERS ', result);
        this.vehiclesList = result.content;
      },
      err => {
        console.log('error NEAREST DRIVERS ', err);
      }
    );
  }
  getCordinates() {
    this.geoLocation.getCurrentPosition().then((resp) => {

      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
      this.lat = 10.765354;
      this.lon = 76.4813653;
    //  alert(resp.coords.latitude)
      this.getVehicles();

  }).catch((err) => {
    console.log('Error getting location', err);
  }

  );
}



}
