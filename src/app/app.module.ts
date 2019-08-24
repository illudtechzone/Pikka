import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MapsAPILoader, AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AuthInterceptor } from './services/security/auth-interceptor';
import { ConfigsModule } from './configs/configs.module';
import { IonicStorageModule } from '@ionic/storage';
import { UtilService } from './services/util.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    ConfigsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    OAuthModule.forRoot(),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDTGidFqTY4Tv-EXCev5PTowNGrqj4v6Y4',
      libraries: ['places', 'geometry']
    }),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
  ],
  providers: [

    Camera,
    GoogleMapsAPIWrapper,
    Geolocation,
    StatusBar,
    SplashScreen,
    UtilService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
