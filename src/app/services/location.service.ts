import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getAddress(lat: number, lon: number) {
    console.log('latitude ', lat);
    console.log('longitude ', lon);
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&key=AIzaSyAwC9dPmp280b4C18RBcGWjInRi9NGxo5c');
  }
}
