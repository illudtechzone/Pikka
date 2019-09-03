import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  isAccepted=false;
  constructor() { }
  getStatus(){
    return this.isAccepted;
  }
  setStatus(isAccepted:boolean){
    this.isAccepted=isAccepted;
  }
}
