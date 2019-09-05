import { NotificationService } from './../../services/notification.service';
import { LocationService } from './../../services/location.service';
import { CurrentUserService } from './../../services/current-user.service';
import { RideDTO } from './../../api/models/ride-dto';
import { ActivityService } from './../../services/activity.service';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { DriverDetialsComponent } from 'src/app/components/driver-detials/driver-detials.component';
import { GoogleMap, Environment, GoogleMapOptions, GoogleMaps, Marker, GoogleMapsEvent, MarkerOptions, GoogleMapsAnimation } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UtilService } from 'src/app/services/util.service';
import { InvoiceComponent } from 'src/app/components/invoice/invoice.component';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {

  isRequest = false;
  isAccepted=false;
  isVehicleList = true;
  mapCanvas: GoogleMap;
  lat = 10.754090;
  lon = 76.547018;
  vehiclesList: any[] = [];
  processInstanceId = '';
  routePoints: any[] = [];

  constructor(private geoLocation: Geolocation,
              private navController: NavController,
              private modalController: ModalController,
              private quryResource: QueryResourceService,
              private commandResourceService: CommandResourceService,
              private activityService: ActivityService,
              private util: UtilService,
              private toastController: ToastController,
              private currentUserService: CurrentUserService,
              private locationService: LocationService,
              private notificationService:NotificationService) {}
  ngOnInit() {
   this.processInstanceId = this.activityService.getProcessInstanceId();
   this.locationService.getDiractions().then(
    (data: any) => {
      this.routePoints = data.points;
      this.currentUserService.getRoute().distance=data.distance;
      console.log('>>>got diggstance and points >>>>', data.distance);

      console.log('>>>got route points >>>>', data);
      console.log('>>>got route points >>>>', this.routePoints);
      this.showMap();
    }
    );

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

  driverAccepted() {


  }

  async showInvoice(vehicle) {
    console.log('koiii');
    const modal = await this.modalController.create({
      component: InvoiceComponent,
    });
    await modal.present();
     const { data } = await modal.onWillDismiss();
     if(data.response==='confirm'){
      this.requestVehicle(vehicle);
     }
    console.log(data);

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

  // ionViewDidEnter() {
  //   console.log('ion view will enter method');


  //   this.isAccepted=this.notificationService.getStatus();
  //   this.processInstanceId = this.activityService.getProcessInstanceId();
  ionViewWillEnter() {
    this.isAccepted=this.notificationService.getStatus();
    this.processInstanceId = this.activityService.getProcessInstanceId();

    this.locationService.getDiractions().then(
      (data: any) => {
        this.routePoints = data;
        console.log('>>>got route points >>>>', data);
        console.log('>>>got route points >>>>', this.routePoints);
        this.currentLocation();
      }
      );

    }
    currentLocation() {
      this.geoLocation.getCurrentPosition().then(resp => {
        this.lat = resp.coords.latitude;
        this.lon = resp.coords.longitude;
        this.showMap();

       }, error => {
         console.log('Error getting location', error);
       });
    }

showMap() {
      console.log('loadMap');

      console.log('route points', this.routePoints);
      Environment.setEnv({
          API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAwC9dPmp280b4C18RBcGWjInRi9NGxo5c',
          API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAwC9dPmp280b4C18RBcGWjInRi9NGxo5c'
        });
      const mapOptions: GoogleMapOptions = {
          camera: {
            target: this.routePoints[0],
            tilt: 60,
            zoom: 18,
            bearing: 140
          },
          controls: {
            compass: true,
            myLocationButton: true,
            myLocation: true,
            zoom: true,
            mapToolbar: true
          },
        };
      this.mapCanvas = GoogleMaps.create('map_canvas', mapOptions);
      this.mapCanvas .moveCamera({
        target: this.routePoints});
      this.mapCanvas.one(GoogleMapsEvent.MAP_READY).then(() => {
          this.mapCanvas.addPolyline({
            points: this.routePoints,
            color: '#AA00FF',
            width: 6,
            geodesic: true,
          }).then((resp) => {
            const markerOptions: MarkerOptions = {
              title: 'Sample Title',
              position: this.routePoints[this.routePoints.length - 1],
              animation: GoogleMapsAnimation.BOUNCE
            };
            this.mapCanvas.addMarker(markerOptions).then((marker: Marker) => {
              marker.showInfoWindow();
            });
          });
        });
this.getVehicles();
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


async presentToast(message: string) {
  const toast = await this.toastController.create({
    message,
    duration: 2000,
    cssClass: 'toast'
  });
  toast.present();
}




}
