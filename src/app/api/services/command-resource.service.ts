/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { DefaultInfoRequest } from '../models/default-info-request';
import { DriverDTO } from '../models/driver-dto';
import { RiderDTO } from '../models/rider-dto';
import { DriverInfo } from '../models/driver-info';
import { PaymentStatus } from '../models/payment-status';
import { RateAndReview } from '../models/rate-and-review';
import { RideDTO } from '../models/ride-dto';
import { RideStatus } from '../models/ride-status';

/**
 * Command Resource
 */
@Injectable({
  providedIn: 'root',
})
class CommandResourceService extends __BaseService {
  static readonly collectRiderLocationDetailsUsingPOSTPath = '/api/command/collectRiderLocationDetails/{taskId}';
  static readonly createDriverIfNotExistUsingPOSTPath = '/api/command/create/driver';
  static readonly createRiderIfNotExistUsingPOSTPath = '/api/command/create/rider';
  static readonly createDriverUsingPOSTPath = '/api/command/driver';
  static readonly driverResponseUsingPOSTPath = '/api/command/driverResponse/{taskId}';
  static readonly initateWorkflowUsingPOSTPath = '/api/command/initiate';
  static readonly paymentUsingPOSTPath = '/api/command/payment/{taskId}';
  static readonly rateAndReviewUsingPOSTPath = '/api/command/rateAndReview/{taskId}';
  static readonly sendRequestToDriverUsingPOSTPath = '/api/command/request/driver';
  static readonly rideCompleteUsingPOSTPath = '/api/command/rideComplete/{taskId}';
  static readonly startRideUsingPOSTPath = '/api/command/startRide/{taskId}';
  static readonly updateDriverUsingPUTPath = '/api/command/update/driver';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `CommandResourceService.CollectRiderLocationDetailsUsingPOSTParams` containing the following parameters:
   *
   * - `taskId`: taskId
   *
   * - `defaultInfoRequest`: defaultInfoRequest
   */
  collectRiderLocationDetailsUsingPOSTResponse(params: CommandResourceService.CollectRiderLocationDetailsUsingPOSTParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.defaultInfoRequest;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/collectRiderLocationDetails/${params.taskId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `CommandResourceService.CollectRiderLocationDetailsUsingPOSTParams` containing the following parameters:
   *
   * - `taskId`: taskId
   *
   * - `defaultInfoRequest`: defaultInfoRequest
   */
  collectRiderLocationDetailsUsingPOST(params: CommandResourceService.CollectRiderLocationDetailsUsingPOSTParams): __Observable<null> {
    return this.collectRiderLocationDetailsUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param driverDTO driverDTO
   * @return OK
   */
  createDriverIfNotExistUsingPOSTResponse(driverDTO: DriverDTO): __Observable<__StrictHttpResponse<DriverDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = driverDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/create/driver`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DriverDTO>;
      })
    );
  }
  /**
   * @param driverDTO driverDTO
   * @return OK
   */
  createDriverIfNotExistUsingPOST(driverDTO: DriverDTO): __Observable<DriverDTO> {
    return this.createDriverIfNotExistUsingPOSTResponse(driverDTO).pipe(
      __map(_r => _r.body as DriverDTO)
    );
  }

  /**
   * @param riderDTO riderDTO
   * @return OK
   */
  createRiderIfNotExistUsingPOSTResponse(riderDTO: RiderDTO): __Observable<__StrictHttpResponse<RiderDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = riderDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/create/rider`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RiderDTO>;
      })
    );
  }
  /**
   * @param riderDTO riderDTO
   * @return OK
   */
  createRiderIfNotExistUsingPOST(riderDTO: RiderDTO): __Observable<RiderDTO> {
    return this.createRiderIfNotExistUsingPOSTResponse(riderDTO).pipe(
      __map(_r => _r.body as RiderDTO)
    );
  }

  /**
   * @param driverDTO driverDTO
   * @return OK
   */
  createDriverUsingPOSTResponse(driverDTO: DriverDTO): __Observable<__StrictHttpResponse<DriverDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = driverDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/driver`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DriverDTO>;
      })
    );
  }
  /**
   * @param driverDTO driverDTO
   * @return OK
   */
  createDriverUsingPOST(driverDTO: DriverDTO): __Observable<DriverDTO> {
    return this.createDriverUsingPOSTResponse(driverDTO).pipe(
      __map(_r => _r.body as DriverDTO)
    );
  }

  /**
   * @param params The `CommandResourceService.DriverResponseUsingPOSTParams` containing the following parameters:
   *
   * - `taskId`: taskId
   *
   * - `driverInfo`: driverInfo
   */
  driverResponseUsingPOSTResponse(params: CommandResourceService.DriverResponseUsingPOSTParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.driverInfo;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/driverResponse/${params.taskId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `CommandResourceService.DriverResponseUsingPOSTParams` containing the following parameters:
   *
   * - `taskId`: taskId
   *
   * - `driverInfo`: driverInfo
   */
  driverResponseUsingPOST(params: CommandResourceService.DriverResponseUsingPOSTParams): __Observable<null> {
    return this.driverResponseUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @return OK
   */
  initateWorkflowUsingPOSTResponse(): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/initiate`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * @return OK
   */
  initateWorkflowUsingPOST(): __Observable<string> {
    return this.initateWorkflowUsingPOSTResponse().pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param params The `CommandResourceService.PaymentUsingPOSTParams` containing the following parameters:
   *
   * - `taskId`: taskId
   *
   * - `paymentStatus`: paymentStatus
   */
  paymentUsingPOSTResponse(params: CommandResourceService.PaymentUsingPOSTParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.paymentStatus;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/payment/${params.taskId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `CommandResourceService.PaymentUsingPOSTParams` containing the following parameters:
   *
   * - `taskId`: taskId
   *
   * - `paymentStatus`: paymentStatus
   */
  paymentUsingPOST(params: CommandResourceService.PaymentUsingPOSTParams): __Observable<null> {
    return this.paymentUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CommandResourceService.RateAndReviewUsingPOSTParams` containing the following parameters:
   *
   * - `taskId`: taskId
   *
   * - `rateAndReview`: rateAndReview
   */
  rateAndReviewUsingPOSTResponse(params: CommandResourceService.RateAndReviewUsingPOSTParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.rateAndReview;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/rateAndReview/${params.taskId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `CommandResourceService.RateAndReviewUsingPOSTParams` containing the following parameters:
   *
   * - `taskId`: taskId
   *
   * - `rateAndReview`: rateAndReview
   */
  rateAndReviewUsingPOST(params: CommandResourceService.RateAndReviewUsingPOSTParams): __Observable<null> {
    return this.rateAndReviewUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param rideDto rideDto
   * @return OK
   */
  sendRequestToDriverUsingPOSTResponse(rideDto: RideDTO): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = rideDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/request/driver`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * @param rideDto rideDto
   * @return OK
   */
  sendRequestToDriverUsingPOST(rideDto: RideDTO): __Observable<string> {
    return this.sendRequestToDriverUsingPOSTResponse(rideDto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param params The `CommandResourceService.RideCompleteUsingPOSTParams` containing the following parameters:
   *
   * - `taskId`: taskId
   *
   * - `rideComplete`: rideComplete
   */
  rideCompleteUsingPOSTResponse(params: CommandResourceService.RideCompleteUsingPOSTParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.rideComplete;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/rideComplete/${params.taskId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `CommandResourceService.RideCompleteUsingPOSTParams` containing the following parameters:
   *
   * - `taskId`: taskId
   *
   * - `rideComplete`: rideComplete
   */
  rideCompleteUsingPOST(params: CommandResourceService.RideCompleteUsingPOSTParams): __Observable<null> {
    return this.rideCompleteUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CommandResourceService.StartRideUsingPOSTParams` containing the following parameters:
   *
   * - `taskId`: taskId
   *
   * - `startRide`: startRide
   */
  startRideUsingPOSTResponse(params: CommandResourceService.StartRideUsingPOSTParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.startRide;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/startRide/${params.taskId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `CommandResourceService.StartRideUsingPOSTParams` containing the following parameters:
   *
   * - `taskId`: taskId
   *
   * - `startRide`: startRide
   */
  startRideUsingPOST(params: CommandResourceService.StartRideUsingPOSTParams): __Observable<null> {
    return this.startRideUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param driverDTO driverDTO
   * @return OK
   */
  updateDriverUsingPUTResponse(driverDTO: DriverDTO): __Observable<__StrictHttpResponse<DriverDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = driverDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/command/update/driver`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DriverDTO>;
      })
    );
  }
  /**
   * @param driverDTO driverDTO
   * @return OK
   */
  updateDriverUsingPUT(driverDTO: DriverDTO): __Observable<DriverDTO> {
    return this.updateDriverUsingPUTResponse(driverDTO).pipe(
      __map(_r => _r.body as DriverDTO)
    );
  }
}

module CommandResourceService {

  /**
   * Parameters for collectRiderLocationDetailsUsingPOST
   */
  export interface CollectRiderLocationDetailsUsingPOSTParams {

    /**
     * taskId
     */
    taskId: string;

    /**
     * defaultInfoRequest
     */
    defaultInfoRequest: DefaultInfoRequest;
  }

  /**
   * Parameters for driverResponseUsingPOST
   */
  export interface DriverResponseUsingPOSTParams {

    /**
     * taskId
     */
    taskId: string;

    /**
     * driverInfo
     */
    driverInfo: DriverInfo;
  }

  /**
   * Parameters for paymentUsingPOST
   */
  export interface PaymentUsingPOSTParams {

    /**
     * taskId
     */
    taskId: string;

    /**
     * paymentStatus
     */
    paymentStatus: PaymentStatus;
  }

  /**
   * Parameters for rateAndReviewUsingPOST
   */
  export interface RateAndReviewUsingPOSTParams {

    /**
     * taskId
     */
    taskId: string;

    /**
     * rateAndReview
     */
    rateAndReview: RateAndReview;
  }

  /**
   * Parameters for rideCompleteUsingPOST
   */
  export interface RideCompleteUsingPOSTParams {

    /**
     * taskId
     */
    taskId: string;

    /**
     * rideComplete
     */
    rideComplete: RideStatus;
  }

  /**
   * Parameters for startRideUsingPOST
   */
  export interface StartRideUsingPOSTParams {

    /**
     * taskId
     */
    taskId: string;

    /**
     * startRide
     */
    startRide: RideStatus;
  }
}

export { CommandResourceService }
