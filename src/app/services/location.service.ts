import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { Observable } from 'rxjs';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  GoogleAutocomplete: any;
  autocomplete: any;
  autocompleteItems = [];
  private  placeSearch;

  private currentLat: number;
  private currentLon: number;
  private geocoder: any;


  constructor(private http: HttpClient,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private mapsWrapper: GoogleMapsAPIWrapper,
              private geolocation: Geolocation,
              private zone: NgZone) {

                console.log('Constror service location');
                this.mapsAPILoader.load().then(() => {
                });

                this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
                this.autocomplete = { input: '' };
                this.autocompleteItems = [];

               }

  calculateDistance(from: any, to: any): number {
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      from,
      to
    );
    return distance;
  }

  getCurrentLocation() {
    return this.geolocation.getCurrentPosition();
  }


  async geocodeAddress(placeId: string): Promise<number[]> {

    return new Promise<number[]>((resolve, reject) => {
    let latlon: number[];
    this.geocoder = new google.maps.Geocoder();
    this.geocoder.geocode({placeId}, async (results, status) => {
      if (status !== 'OK') {
        console.log('Geocoder failed due to: ' + status);
        return;
      }
      latlon = [
          results[0].geometry.location.lat(),
          results[0].geometry.location.lng()
      ];
      console.log(latlon);
      console.log('Lat is inside geo ' + results[0].geometry.location.lat());
      console.log('Lon is inside geo ' + results[0].geometry.location.lng());
      resolve(latlon);
      });
    });
  }

  async getAddressFromLatLon(lat: any, lon: any): Promise<number[]> {

    return new Promise<number[]>((resolve, reject) => {
    let latlon: number[];
    this.geocoder = new google.maps.Geocoder();
    const latlng = {lat: parseFloat(lat), lng: parseFloat(lon)};
    this.geocoder.geocode({location: latlng}, async (results, status) => {
      if (status !== 'OK') {
        console.log('Geocoder failed due to: ' + status);
        return;
      }
      console.log('result geocodeAddressFromLatLon ' + results);
      resolve(results);
      });
    });
  }


  getAdressPredictions(searchTerm: string): Promise<any[]> {
    console.log('In the service location ');
    return new Promise<number[]>((resolve, reject) => {

      this.GoogleAutocomplete.getPlacePredictions({ input: searchTerm },
        (predictions, status) => {
          this.autocompleteItems = [];
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
          console.log('result...', this.autocompleteItems);
          resolve(this.autocompleteItems);
        }, err => {
          console.log('err...', err);
        });

    });
  }



}
