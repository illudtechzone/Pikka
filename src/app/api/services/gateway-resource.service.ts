/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { RouteVM } from '../models/route-vm';

/**
 * Gateway Resource
 */
@Injectable({
  providedIn: 'root',
})
class GatewayResourceService extends __BaseService {
  static readonly activeRoutesUsingGETPath = '/api/gateway/routes';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return OK
   */
  activeRoutesUsingGETResponse(): __Observable<__StrictHttpResponse<Array<RouteVM>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/gateway/routes`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<RouteVM>>;
      })
    );
  }
  /**
   * @return OK
   */
  activeRoutesUsingGET(): __Observable<Array<RouteVM>> {
    return this.activeRoutesUsingGETResponse().pipe(
      __map(_r => _r.body as Array<RouteVM>)
    );
  }
}

module GatewayResourceService {
}

export { GatewayResourceService }
