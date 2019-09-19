import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Observable, Subscription, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JhiWebSocketService {

  stompClient = null;
  subscriber = null;
  connection: Promise<any>;
  connectedPromise: any;
  listener: Observable<any>;
  listenerObserver: Observer<any>;
  alreadyConnectedOnce = false;
  private subscription: Subscription;

  private serverUrl = ' //35.232.29.128:8082/websocket/tracker';

  constructor() {
      this.connection = this.createConnection();
      this.listener = this.createListener();
  }

  connect(userName) {

      if (this.connectedPromise === null) {
          this.connection = this.createConnection();
      }



      const socket = new SockJS(this.serverUrl);
      this.stompClient = Stomp.over(socket);
      const headers = {login: userName };
      this.stompClient.connect(headers, () => {
          this.connectedPromise('success');
          this.connectedPromise = null;

          if (!this.alreadyConnectedOnce) {

              this.alreadyConnectedOnce = true;
          }
      });
  }

  disconnect() {
      if (this.stompClient !== null) {
          this.stompClient.disconnect();
          this.stompClient = null;
      }
      if (this.subscription) {
          this.subscription.unsubscribe();
          this.subscription = null;
      }
      this.alreadyConnectedOnce = false;
  }

  receive() {
      return this.listener;
  }



  subscribe() {
      this.connection.then(() => {
          this.subscriber = this.stompClient.subscribe('/user/topic/review', data => {
              this.listenerObserver.next(JSON.parse(data.body));
          });
      });
  }

  unsubscribe() {
      if (this.subscriber !== null) {
          this.subscriber.unsubscribe();
      }
      this.listener = this.createListener();
  }

  private createListener(): Observable<any> {
      return new Observable(observer => {
          this.listenerObserver = observer;
      });
  }

  private createConnection(): Promise<any> {
      return new Promise((resolve, reject) => (this.connectedPromise = resolve));
  }
}
