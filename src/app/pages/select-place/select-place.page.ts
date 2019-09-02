import { CurrentUserService } from './../../services/current-user.service';
import { ActivityService } from './../../services/activity.service';
import { RouteLocations } from './../../dtos/route-locations';
import { NavController, ToastController } from '@ionic/angular';
import { LocationService } from './../../services/location.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Component, OnInit, NgZone } from '@angular/core';
import { CommandResourceService, QueryResourceService } from 'src/app/api/services';
import { log } from 'util';
import { UtilService } from 'src/app/services/util.service';
declare var google: any;
@Component({
  selector: 'app-select-place',
  templateUrl: './select-place.page.html',
  styleUrls: ['./select-place.page.scss'],
})
export class SelectPlacePage implements OnInit {
  GoogleAutocomplete: any;
  autocomplete: any;
  autocompleteItems = [];
  fromPlaceId = '';
  boo = true;
  taskid = '';
  toPlaceId = '';
  currentSearchBar = '';
  routeLocation: RouteLocations = new RouteLocations;
  predictions: any = [{ description: 'no match' }];
  lon: number;
  lat: number;
  private loader: any;
  constructor(private geoLocation: Geolocation,
              private toastController: ToastController,
              private locationService: LocationService,
              private navController: NavController,
              private commandResource: CommandResourceService,
              private queryResource: QueryResourceService,
              private activityService: ActivityService,
              private util: UtilService,
              private currentUserService: CurrentUserService,
              private zone: NgZone) {

    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];

  }

  //// auto complete//////////

  updateSearchResults(searchBar: string) {

    console.log('searching...');
    this.currentSearchBar = searchBar;
    let data = '';
    if (this.currentSearchBar === 'from') {
      data = this.routeLocation.fromAddress;


    } else {
      data = this.routeLocation.toAddress;

    }
    if (data == '') {
      this.autocompleteItems = [];
      return;
    }
    this.locationService.getAdressPredictions(data).then((resp: any[]) => {
      this.autocompleteItems = resp;
    }, err => {
      console.log('prediction.err...g', err);

    });
  }

  async presentToast() {
    const mes = 'api key expired';
    const toast = await this.toastController.create({
      message: mes,
      duration: 2000
    });
    toast.present();
  }


  selectSearchResult(item: any) {

    console.log('selected item is ', item.description);

    if (this.currentSearchBar === 'from') {
      this.routeLocation.fromAddress = item.description;
      this.fromPlaceId = item.place_id;
    } else {
      this.routeLocation.toAddress = item.description;
      this.toPlaceId = item.place_id;
    }
    console.log('current route is ', this.routeLocation);

  }


  /////////////////////////////////


  ngOnInit() {
    this.currentLocation();
  }

  currentLocation() {
    this.geoLocation.getCurrentPosition().then((resp) => {
      console.log('current loaction ', resp);
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
      this.locationService.getAddressFromLatLon(this.lat, this.lon).then((result: any) => {

        console.log('sucess geting location ', result);
        if (result.status !== 'OVER_QUERY_LIMIT') {
          this.routeLocation.fromAddress = result[0].formatted_address;
          this.fromPlaceId = result[0].place_id;
            }
      }, err => {
        console.log('error while geting location', err);

      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  go() {
    this.util.createLoader()
      .then(loader => {
        this.loader = loader;
        this.loader.present();
        console.log('intiating workflow');
        // tslint:disable-next-line: max-line-length
        this.commandResource.initateWorkflowUsingPOST().subscribe(
          result => {
            console.log('sucessfuly started workflow with proces instance id', result);
            this.activityService.setProcessInstanceId(result);
            this.getTask(result);

          },
          err => {
            console.log('error starting workflow ', err);
            this.loader.dismiss();
          }
        );
      });



  }

  getTask(processInstanceId: string) {
   
        this.queryResource.getTasksUsingGET({ processInstanceId }).subscribe(
          (result: any) => {
            console.log('sucess geting task', result);
            console.log('task id ', result.data[0].id);
            this.collectLocation(result.data[0].id);
          }, err => {
            console.log('error geting task', err);
            this.loader.dismiss();
          }
        );
  }

  collectLocation(taskId: string) {
        console.log('route location', this.routeLocation);
        this.currentUserService.setRoute(this.routeLocation);
        this.commandResource.collectRiderLocationDetailsUsingPOST({
          taskId, defaultInfoRequest: {
            destination: this.routeLocation.toAddress,
            pickUp: this.routeLocation.fromAddress
          }
        }).subscribe(
          (result: any) => {
            console.log('sucess giving location info', result);
            this.loader.dismiss();
            this.navController.navigateForward('/ride');
          },
          err => {
            console.log('error giving location info', err);
            this.loader.dismiss();

          }
        );
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
