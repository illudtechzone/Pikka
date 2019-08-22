import { ActivityService } from './../../services/activity.service';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
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
  processInstanceId= '';
  constructor(private geoLocation: Geolocation,
              private navController: NavController,
              private modalController: ModalController,
              private quryResource: QueryResourceService,
              private commandResourceService: CommandResourceService,
              private activityService: ActivityService) {}
  ngOnInit() {
    this.activityService.getProcessInstanceId();
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

    this.quryResource.getTasksUsingGET({processInstanceId: this.processInstanceId}).subscribe((result: any) => {
      console.log(' geting tasks', result);
    },
    err => {
      console.log('error geting tasks', err);
    });

  }

// chooseDriver(taskId:string){
//   this.isRequest = !this.isRequest;
//   this.commandResourceService.chooseDriverUsingPOST({taskId:taskId,driverInfo:{}}).subscribe((result:any)=>{
//     this.isRequest = !this.isRequest;
//   });
// }
 // map code start

  ionViewWillEnter() {
    console.log('ion view will enter method');
    this.getCordinates();
    this.showMap();

    }
    showMap() {

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
      title: 'newyork currentLocation',
      icon : 'red',
      animation: 'DROP',
      position: {
        lat:this.lat,
        lng:this.lon,

      }
    });
  }

  getVehicles() {

   const latlon = this.lat + ',' + this.lon;
   this.quryResource.searchByNearestLocationUsingGET({latLon: latlon, kiloMeter: 10, size: 5}).subscribe(
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

  }).catch((err) => {
    console.log('Error getting location', err);
  }

  );
}



}
