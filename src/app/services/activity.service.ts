import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private processInstanceId = '';
  constructor() { }
  getProcessInstanceId():string{
    return this.processInstanceId
  }

  setProcessInstanceId(processInstanceId:string){
     this.processInstanceId=processInstanceId;
  }

}
