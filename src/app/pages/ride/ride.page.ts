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
import { JhiWebSocketService } from 'src/app/services/jhi-web-socket.service';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {
  status: string;
  isRequest = false;
  isAccepted = false;
  driverCompleted = false;
  driverUserName: string;
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
              private notificationService: NotificationService,
              private jhiNotification: JhiWebSocketService,
              private driverService: DriverService) {}
  ngOnInit() {
    this.jhiNotification.subscribe();
    this.jhiNotification.receive().subscribe(data => {
    this.driverService.isAccepted = true;
    this.driverService.driverUserName = data.rideDTO.driverId;
    this.driverUserName = this.driverService.driverUserName;
    this.isAccepted = this.driverService.isAccepted;

    if (data.status === 'payment completed') {
      this.status = data.status;
      console.log('payment completed');

      this.presentModal(data.rideDTO.driverId);

      this.driverService.clearDriverDetails();
      this.navController.navigateRoot('/home');
  }
    if (data.status === 'accept') {
    this.status = 'Driver Accepted';
    console.log('Driver Accepted');

  }
    if (data.status === 'ridestarted') {
    this.status = 'Ride Started';
    console.log('Driver Ride  Started');

  }
    if (data.status === 'ridecompleted') {
      this.driverService.driverCompleted = true;
      this.driverCompleted = this.driverService.driverCompleted;
      this.status = 'Ride Completed';
      console.log('Driver Ride  Completed');

  }







 });

  }


  async presentModal(id: string) {
    console.log('koiii');
    const modal = await this.modalController.create({
      component: DriverDetialsComponent,
     componentProps: { driverId: id}
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
      componentProps:{lastInvoice:false}
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data.response === 'confirm') {
      this.requestVehicle(vehicle, data.distance, data.fare);
     }
    console.log(data);

  }


  requestVehicle(vehicle, distance: number, fare: number) {
    this.util.createLoader()
      .then(loader => {
        loader.present();
        const rideDTo: RideDTO = {};
        rideDTo.driverId = vehicle.iDPcode;
        rideDTo.addressDestination = this.currentUserService.getRoute().toAddress;
        rideDTo.addressStartingPoint = this.currentUserService.getRoute().fromAddress;
        rideDTo.totalDistance = distance;
        rideDTo.fare = fare;
        rideDTo.riderId = this.currentUserService.getUser().login;
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

    this.isAccepted = this.driverService.isAccepted;
    this.driverUserName = this.driverService.driverUserName;
    this.driverCompleted = this.driverService.driverCompleted;
    this.processInstanceId = this.activityService.getProcessInstanceId();

    this.locationService.getDiractions().then(
      (data: any) => {
        this.routePoints = data.points;
        this.currentUserService.getRoute().distance = data.distance;
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
