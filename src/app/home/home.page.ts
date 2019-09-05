import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationService } from './../services/location.service';
import { NavController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMap, Environment, GoogleMapOptions, GoogleMaps, Marker, GoogleMapsEvent} from '@ionic-native/google-maps';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  constructor(private geolocation: Geolocation,
              private navController: NavController,
              private locationService: LocationService,
              private androidPermissions:AndroidPermissions,
              private locationAccuracy:LocationAccuracy,
              private platform: Platform) {
                this.locationCoords = {
                  latitude: "",
                  longitude: "",
                  accuracy: "",
                  timestamp: ""
                }
                this.timetest = Date.now();
              }
  status: Boolean = false;
mapCanvas: GoogleMap;

locationCoords: any;
  timetest: any;
ngOnInit() {

  console.log('ion Init method');
 
  if (this.platform.is('android')) {
    this.checkGPSPermission();
  } else {
    this.getLocationCoordinates();
  }

  }

    showMap() {

        // This code is necessary for browser
      console.log('loadMap');

      Environment.setEnv({
          API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyDTGidFqTY4Tv-EXCev5PTowNGrqj4v6Y4',
          API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyDTGidFqTY4Tv-EXCev5PTowNGrqj4v6Y4'
        });
      const mapOptions: GoogleMapOptions = {
          camera: {
            target: {
              lat: this.locationCoords.latitude,
              lng: this.locationCoords.longitude ,
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
        lat: this.locationCoords.latitude,
        lng: this.locationCoords.longitude ,

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


      ////////////////location access methods////////

      checkGPSPermission() {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
          result => {
            if (result.hasPermission) {
     
              //If having permission show 'Turn On GPS' dialogue
              this.askToTurnOnGPS();
            } else {
     
              //If not having permission ask for permission
              this.requestGPSPermission();
            }
          },
          err => {
            alert(err);
          }
        );
      }

      requestGPSPermission() {
        this.locationAccuracy.canRequest().then((canRequest: boolean) => {
          if (canRequest) {
            console.log("4");
          } else {
            //Show 'GPS Permission Request' dialogue
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
              .then(
                () => {
                  // call method to turn on GPS
                  this.askToTurnOnGPS();
                },
                error => {
                  //Show alert if user click on 'No Thanks'
                  alert('requestPermission Error requesting location permissions ' + error)
                }
              );
          }
        });
      }

      askToTurnOnGPS() {
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            // When GPS Turned ON call method to get Accurate location coordinates
            this.getLocationCoordinates();
          },
          error => alert('Error requesting location permissions ' + JSON.stringify(error))
        );
      }

      getLocationCoordinates() {
        this.geolocation.getCurrentPosition().then((resp) => {
          this.locationCoords.latitude = resp.coords.latitude;
          this.locationCoords.longitude = resp.coords.longitude;
          this.locationCoords.accuracy = resp.coords.accuracy;
          this.locationCoords.timestamp = resp.timestamp;
          this.showMap();
        }).catch((error) => {
          alert('Error getting location' + error);
        });
      }
}
