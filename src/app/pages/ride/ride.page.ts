import { CurrentUserService } from './../../services/current-user.service';
import { RideDTO } from './../../api/models/ride-dto';
import { ActivityService } from './../../services/activity.service';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { DriverDetialsComponent } from 'src/app/components/driver-detials/driver-detials.component';
import { GoogleMap, Environment, GoogleMapOptions, GoogleMaps, Marker, GoogleMapsEvent } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UtilService } from 'src/app/services/util.service';

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
  processInstanceId = '';
  constructor(private geoLocation: Geolocation,
              private navController: NavController,
              private modalController: ModalController,
              private quryResource: QueryResourceService,
              private commandResourceService: CommandResourceService,
              private activityService: ActivityService,
              private util: UtilService,
              private toastController: ToastController,
              private currentUserService: CurrentUserService) {}
  ngOnInit() {
   this.processInstanceId = this.activityService.getProcessInstanceId();
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
  requestVehicle(vehicle) {
    this.util.createLoader()
      .then(loader => {
        loader.present();
        const rideDTo: RideDTO = {};
        rideDTo.driverId = vehicle.iDPcode;
        rideDTo.addressDestination = this.currentUserService.getRoute().toAddress;
        rideDTo.addressStartingPoint = this.currentUserService.getRoute().fromAddress;
        rideDTo.totalDistance = 10;
        this.commandResourceService.sendRequestToDriverUsingPOST({rideDto: rideDTo, processInstanceId: this.processInstanceId}).subscribe(
      data => {
        console.log('Send Request Status ', data);
        loader.dismiss();
      },
      err => {
        console.log('err sending  Request  ', err);

        loader.dismiss();
      }
    );
      });

  }

  ionViewWillEnter() {
    console.log('ion view will enter method');
    this.getCordinates();
    this.showMap();
    this.getVehicles();

    }
    showMap() {

      console.log('loadMap');

      Environment.setEnv({
          API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyDTGidFqTY4Tv-EXCev5PTowNGrqj4v6Y4',
          API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyDTGidFqTY4Tv-EXCev5PTowNGrqj4v6Y4'
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
      title: 'my location',
      icon : 'red',
      animation: 'DROP',
      position: {
        lat: this.lat,
        lng: this.lon,

      }
    });
  }

  getVehicles() {

    this.util.createLoader()
      .then(loader => {
        loader.present();
        const latlon = this.lat + ',' + this.lon;
        this.quryResource.searchByNearestLocationUsingGET({latLon: latlon, kiloMeter: 30, size: 5}).subscribe(
      (result: any) => {
        console.log('GOT NEAREST DRIVERS ', result);
        this.vehiclesList = result.content;
        loader.dismiss();
        if (result.content.length === 0) {
          this.presentToast('no vehicles found');
        }
      },
      err => {
        console.log('error NEAREST DRIVERS ', err);
        loader.dismiss();
      }
    );
      });
  }
  getCordinates() {
    this.geoLocation.getCurrentPosition().then((resp) => {

      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;

  }).catch((err) => {
    console.log('Error getting location', err);
  }

  );
}

async presentToast(message: string) {
  const toast = await this.toastController.create({
    message,
    duration: 2000,
    cssClass: 'toast'
  });
  toast.present();
}


}
