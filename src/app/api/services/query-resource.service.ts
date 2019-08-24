/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PageOfDriver } from '../models/page-of-driver';
import { OpenBookings } from '../models/open-bookings';
import { DataResponse } from '../models/data-response';
import { DefaultInfoRequest } from '../models/default-info-request';

/**
 * Query Resource
 */
@Injectable({
  providedIn: 'root',
})
class QueryResourceService extends __BaseService {
  static readonly searchByNearestLocationUsingGETPath = '/api/query/findByNearestLocation/{latLon}/{kiloMeter}';
  static readonly getAllPendingBookingsUsingGETPath = '/api/query/getAllPendingBookings';
  static readonly getAllOpenBookingsUsingGETPath = '/api/query/myAppointments';
  static readonly getTasksUsingGETPath = '/api/query/tasks';
  static readonly getBookingDetailsUsingGETPath = '/api/query/vehicle-booking-details/{processInstanceId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `QueryResourceService.SearchByNearestLocationUsingGETParams` containing the following parameters:
   *
   * - `latLon`: latLon
   *
   * - `kiloMeter`: kiloMeter
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  searchByNearestLocationUsingGETResponse(params: QueryResourceService.SearchByNearestLocationUsingGETParams): __Observable<__StrictHttpResponse<PageOfDriver>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findByNearestLocation/${params.latLon}/${params.kiloMeter}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfDriver>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.SearchByNearestLocationUsingGETParams` containing the following parameters:
   *
   * - `latLon`: latLon
   *
   * - `kiloMeter`: kiloMeter
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  searchByNearestLocationUsingGET(params: QueryResourceService.SearchByNearestLocationUsingGETParams): __Observable<PageOfDriver> {
    return this.searchByNearestLocationUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfDriver)
    );
  }

  /**
   * @param params The `QueryResourceService.GetAllPendingBookingsUsingGETParams` containing the following parameters:
   *
   * - `processInstanceId`: processInstanceId
   *
   * - `processDefinitionKey`: Only return tasks which are part of a process instance which has a process definition with the given key.
   *
   * - `processDefinitionId`: Only return tasks which are part of a process instance which has a process definition with the given id.
   *
   * - `nameLike`: nameLike
   *
   * - `name`: name
   *
   * - `createdOn`: Only return tasks which are created on the given date.
   *
   * - `createdBefore`: Only return tasks which are created before the given date.
   *
   * - `createdAfter`: Only return tasks which are created after the given date.
   *
   * - `candidateUser`: candidateUser
   *
   * - `candidateGroups`: candidateGroups
   *
   * - `candidateGroup`: candidateGroup
   *
   * - `assigneeLike`: assigneeLike
   *
   * - `assignee`: assignee
   *
   * @return OK
   */
  getAllPendingBookingsUsingGETResponse(params: QueryResourceService.GetAllPendingBookingsUsingGETParams): __Observable<__StrictHttpResponse<Array<OpenBookings>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.processInstanceId != null) __params = __params.set('processInstanceId', params.processInstanceId.toString());
    if (params.processDefinitionKey != null) __params = __params.set('processDefinitionKey', params.processDefinitionKey.toString());
    if (params.processDefinitionId != null) __params = __params.set('processDefinitionId', params.processDefinitionId.toString());
    if (params.nameLike != null) __params = __params.set('nameLike', params.nameLike.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.createdOn != null) __params = __params.set('createdOn', params.createdOn.toString());
    if (params.createdBefore != null) __params = __params.set('createdBefore', params.createdBefore.toString());
    if (params.createdAfter != null) __params = __params.set('createdAfter', params.createdAfter.toString());
    if (params.candidateUser != null) __params = __params.set('candidateUser', params.candidateUser.toString());
    if (params.candidateGroups != null) __params = __params.set('candidateGroups', params.candidateGroups.toString());
    if (params.candidateGroup != null) __params = __params.set('candidateGroup', params.candidateGroup.toString());
    if (params.assigneeLike != null) __params = __params.set('assigneeLike', params.assigneeLike.toString());
    if (params.assignee != null) __params = __params.set('assignee', params.assignee.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/getAllPendingBookings`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<OpenBookings>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.GetAllPendingBookingsUsingGETParams` containing the following parameters:
   *
   * - `processInstanceId`: processInstanceId
   *
   * - `processDefinitionKey`: Only return tasks which are part of a process instance which has a process definition with the given key.
   *
   * - `processDefinitionId`: Only return tasks which are part of a process instance which has a process definition with the given id.
   *
   * - `nameLike`: nameLike
   *
   * - `name`: name
   *
   * - `createdOn`: Only return tasks which are created on the given date.
   *
   * - `createdBefore`: Only return tasks which are created before the given date.
   *
   * - `createdAfter`: Only return tasks which are created after the given date.
   *
   * - `candidateUser`: candidateUser
   *
   * - `candidateGroups`: candidateGroups
   *
   * - `candidateGroup`: candidateGroup
   *
   * - `assigneeLike`: assigneeLike
   *
   * - `assignee`: assignee
   *
   * @return OK
   */
  getAllPendingBookingsUsingGET(params: QueryResourceService.GetAllPendingBookingsUsingGETParams): __Observable<Array<OpenBookings>> {
    return this.getAllPendingBookingsUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<OpenBookings>)
    );
  }

  /**
   * @param params The `QueryResourceService.GetAllOpenBookingsUsingGETParams` containing the following parameters:
   *
   * - `withoutTenantId`: If true, only returns tasks without a tenantId set. If false, the withoutTenantId parameter is ignored.
   *
   * - `withoutDueDate`: Only return tasks which don�t have a due date. The property is ignored if the value is false.
   *
   * - `unassigned`: unassigned
   *
   * - `tenantIdLike`: Only return tasks with a tenantId like the given value.
   *
   * - `tenantId`: Only return tasks with the given tenantId.
   *
   * - `taskDefinitionKeyLike`: taskDefinitionKeyLike
   *
   * - `taskDefinitionKey`: taskDefinitionKey
   *
   * - `processInstanceId`: processInstanceId
   *
   * - `processInstanceBusinessKeyLike`: processInstanceBusinessKeyLike
   *
   * - `processInstanceBusinessKey`: processInstanceBusinessKey
   *
   * - `processDefinitionNameLike`: Only return tasks which are part of a process instance which has a process definition with a name like the given value.
   *
   * - `processDefinitionName`: Only return tasks which are part of a process instance which has a process definition with the given name.
   *
   * - `processDefinitionKeyLike`: Only return tasks which are part of a process instance which has a process definition with a key like the given value.
   *
   * - `processDefinitionKey`: Only return tasks which are part of a process instance which has a process definition with the given key.
   *
   * - `processDefinitionId`: Only return tasks which are part of a process instance which has a process definition with the given id.
   *
   * - `priority`: priority
   *
   * - `ownerLike`: ownerLike
   *
   * - `owner`: owner
   *
   * - `nameLike`: nameLike
   *
   * - `name`: name
   *
   * - `minimumPriority`: minimumPriority
   *
   * - `maximumPriority`: maximumPriority
   *
   * - `involvedUser`: involvedUser
   *
   * - `includeTaskLocalVariables`: Indication to include task local variables in the result.
   *
   * - `includeProcessVariables`: Indication to include process variables in the result.
   *
   * - `executionId`: Only return tasks which are part of the execution with the given id.
   *
   * - `excludeSubTasks`: Only return tasks that are not a subtask of another task.
   *
   * - `dueOn`: Only return tasks which are due on the given date.
   *
   * - `dueBefore`: Only return tasks which are due before the given date.
   *
   * - `dueAfter`: Only return tasks which are due after the given date.
   *
   * - `description`: description
   *
   * - `delegationState`: delegationState
   *
   * - `createdOn`: Only return tasks which are created on the given date.
   *
   * - `createdBefore`: Only return tasks which are created before the given date.
   *
   * - `createdAfter`: Only return tasks which are created after the given date.
   *
   * - `category`: Select tasks with the given category. Note that this is the task category, not the category of the process definition (namespace within the BPMN Xml).
   *
   * - `candidateUser`: candidateUser
   *
   * - `candidateOrAssigned`: Select tasks that has been claimed or assigned to user or waiting to claim by user (candidate user or groups).
   *
   * - `candidateGroups`: candidateGroups
   *
   * - `candidateGroup`: candidateGroup
   *
   * - `assigneeLike`: assigneeLike
   *
   * - `assignee`: assignee
   *
   * - `active`: If true, only return tasks that are not suspended (either part of a process that is not suspended or not part of a process at all). If false, only tasks that are part of suspended process instances are returned.
   *
   * @return OK
   */
  getAllOpenBookingsUsingGETResponse(params: QueryResourceService.GetAllOpenBookingsUsingGETParams): __Observable<__StrictHttpResponse<Array<OpenBookings>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.withoutTenantId != null) __params = __params.set('withoutTenantId', params.withoutTenantId.toString());
    if (params.withoutDueDate != null) __params = __params.set('withoutDueDate', params.withoutDueDate.toString());
    if (params.unassigned != null) __params = __params.set('unassigned', params.unassigned.toString());
    if (params.tenantIdLike != null) __params = __params.set('tenantIdLike', params.tenantIdLike.toString());
    if (params.tenantId != null) __params = __params.set('tenantId', params.tenantId.toString());
    if (params.taskDefinitionKeyLike != null) __params = __params.set('taskDefinitionKeyLike', params.taskDefinitionKeyLike.toString());
    if (params.taskDefinitionKey != null) __params = __params.set('taskDefinitionKey', params.taskDefinitionKey.toString());
    if (params.processInstanceId != null) __params = __params.set('processInstanceId', params.processInstanceId.toString());
    if (params.processInstanceBusinessKeyLike != null) __params = __params.set('processInstanceBusinessKeyLike', params.processInstanceBusinessKeyLike.toString());
    if (params.processInstanceBusinessKey != null) __params = __params.set('processInstanceBusinessKey', params.processInstanceBusinessKey.toString());
    if (params.processDefinitionNameLike != null) __params = __params.set('processDefinitionNameLike', params.processDefinitionNameLike.toString());
    if (params.processDefinitionName != null) __params = __params.set('processDefinitionName', params.processDefinitionName.toString());
    if (params.processDefinitionKeyLike != null) __params = __params.set('processDefinitionKeyLike', params.processDefinitionKeyLike.toString());
    if (params.processDefinitionKey != null) __params = __params.set('processDefinitionKey', params.processDefinitionKey.toString());
    if (params.processDefinitionId != null) __params = __params.set('processDefinitionId', params.processDefinitionId.toString());
    if (params.priority != null) __params = __params.set('priority', params.priority.toString());
    if (params.ownerLike != null) __params = __params.set('ownerLike', params.ownerLike.toString());
    if (params.owner != null) __params = __params.set('owner', params.owner.toString());
    if (params.nameLike != null) __params = __params.set('nameLike', params.nameLike.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.minimumPriority != null) __params = __params.set('minimumPriority', params.minimumPriority.toString());
    if (params.maximumPriority != null) __params = __params.set('maximumPriority', params.maximumPriority.toString());
    if (params.involvedUser != null) __params = __params.set('involvedUser', params.involvedUser.toString());
    if (params.includeTaskLocalVariables != null) __params = __params.set('includeTaskLocalVariables', params.includeTaskLocalVariables.toString());
    if (params.includeProcessVariables != null) __params = __params.set('includeProcessVariables', params.includeProcessVariables.toString());
    if (params.executionId != null) __params = __params.set('executionId', params.executionId.toString());
    if (params.excludeSubTasks != null) __params = __params.set('excludeSubTasks', params.excludeSubTasks.toString());
    if (params.dueOn != null) __params = __params.set('dueOn', params.dueOn.toString());
    if (params.dueBefore != null) __params = __params.set('dueBefore', params.dueBefore.toString());
    if (params.dueAfter != null) __params = __params.set('dueAfter', params.dueAfter.toString());
    if (params.description != null) __params = __params.set('description', params.description.toString());
    if (params.delegationState != null) __params = __params.set('delegationState', params.delegationState.toString());
    if (params.createdOn != null) __params = __params.set('createdOn', params.createdOn.toString());
    if (params.createdBefore != null) __params = __params.set('createdBefore', params.createdBefore.toString());
    if (params.createdAfter != null) __params = __params.set('createdAfter', params.createdAfter.toString());
    if (params.category != null) __params = __params.set('category', params.category.toString());
    if (params.candidateUser != null) __params = __params.set('candidateUser', params.candidateUser.toString());
    if (params.candidateOrAssigned != null) __params = __params.set('candidateOrAssigned', params.candidateOrAssigned.toString());
    if (params.candidateGroups != null) __params = __params.set('candidateGroups', params.candidateGroups.toString());
    if (params.candidateGroup != null) __params = __params.set('candidateGroup', params.candidateGroup.toString());
    if (params.assigneeLike != null) __params = __params.set('assigneeLike', params.assigneeLike.toString());
    if (params.assignee != null) __params = __params.set('assignee', params.assignee.toString());
    if (params.active != null) __params = __params.set('active', params.active.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/myAppointments`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<OpenBookings>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.GetAllOpenBookingsUsingGETParams` containing the following parameters:
   *
   * - `withoutTenantId`: If true, only returns tasks without a tenantId set. If false, the withoutTenantId parameter is ignored.
   *
   * - `withoutDueDate`: Only return tasks which don�t have a due date. The property is ignored if the value is false.
   *
   * - `unassigned`: unassigned
   *
   * - `tenantIdLike`: Only return tasks with a tenantId like the given value.
   *
   * - `tenantId`: Only return tasks with the given tenantId.
   *
   * - `taskDefinitionKeyLike`: taskDefinitionKeyLike
   *
   * - `taskDefinitionKey`: taskDefinitionKey
   *
   * - `processInstanceId`: processInstanceId
   *
   * - `processInstanceBusinessKeyLike`: processInstanceBusinessKeyLike
   *
   * - `processInstanceBusinessKey`: processInstanceBusinessKey
   *
   * - `processDefinitionNameLike`: Only return tasks which are part of a process instance which has a process definition with a name like the given value.
   *
   * - `processDefinitionName`: Only return tasks which are part of a process instance which has a process definition with the given name.
   *
   * - `processDefinitionKeyLike`: Only return tasks which are part of a process instance which has a process definition with a key like the given value.
   *
   * - `processDefinitionKey`: Only return tasks which are part of a process instance which has a process definition with the given key.
   *
   * - `processDefinitionId`: Only return tasks which are part of a process instance which has a process definition with the given id.
   *
   * - `priority`: priority
   *
   * - `ownerLike`: ownerLike
   *
   * - `owner`: owner
   *
   * - `nameLike`: nameLike
   *
   * - `name`: name
   *
   * - `minimumPriority`: minimumPriority
   *
   * - `maximumPriority`: maximumPriority
   *
   * - `involvedUser`: involvedUser
   *
   * - `includeTaskLocalVariables`: Indication to include task local variables in the result.
   *
   * - `includeProcessVariables`: Indication to include process variables in the result.
   *
   * - `executionId`: Only return tasks which are part of the execution with the given id.
   *
   * - `excludeSubTasks`: Only return tasks that are not a subtask of another task.
   *
   * - `dueOn`: Only return tasks which are due on the given date.
   *
   * - `dueBefore`: Only return tasks which are due before the given date.
   *
   * - `dueAfter`: Only return tasks which are due after the given date.
   *
   * - `description`: description
   *
   * - `delegationState`: delegationState
   *
   * - `createdOn`: Only return tasks which are created on the given date.
   *
   * - `createdBefore`: Only return tasks which are created before the given date.
   *
   * - `createdAfter`: Only return tasks which are created after the given date.
   *
   * - `category`: Select tasks with the given category. Note that this is the task category, not the category of the process definition (namespace within the BPMN Xml).
   *
   * - `candidateUser`: candidateUser
   *
   * - `candidateOrAssigned`: Select tasks that has been claimed or assigned to user or waiting to claim by user (candidate user or groups).
   *
   * - `candidateGroups`: candidateGroups
   *
   * - `candidateGroup`: candidateGroup
   *
   * - `assigneeLike`: assigneeLike
   *
   * - `assignee`: assignee
   *
   * - `active`: If true, only return tasks that are not suspended (either part of a process that is not suspended or not part of a process at all). If false, only tasks that are part of suspended process instances are returned.
   *
   * @return OK
   */
  getAllOpenBookingsUsingGET(params: QueryResourceService.GetAllOpenBookingsUsingGETParams): __Observable<Array<OpenBookings>> {
    return this.getAllOpenBookingsUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<OpenBookings>)
    );
  }

  /**
   * @param params The `QueryResourceService.GetTasksUsingGETParams` containing the following parameters:
   *
   * - `withoutTenantId`: If true, only returns tasks without a tenantId set. If false, the withoutTenantId parameter is ignored.
   *
   * - `withoutDueDate`: Only return tasks which don�t have a due date. The property is ignored if the value is false.
   *
   * - `unassigned`: unassigned
   *
   * - `tenantIdLike`: Only return tasks with a tenantId like the given value.
   *
   * - `tenantId`: Only return tasks with the given tenantId.
   *
   * - `taskDefinitionKeyLike`: taskDefinitionKeyLike
   *
   * - `taskDefinitionKey`: taskDefinitionKey
   *
   * - `processInstanceId`: processInstanceId
   *
   * - `processInstanceBusinessKeyLike`: processInstanceBusinessKeyLike
   *
   * - `processInstanceBusinessKey`: processInstanceBusinessKey
   *
   * - `processDefinitionNameLike`: Only return tasks which are part of a process instance which has a process definition with a name like the given value.
   *
   * - `processDefinitionName`: Only return tasks which are part of a process instance which has a process definition with the given name.
   *
   * - `processDefinitionKeyLike`: Only return tasks which are part of a process instance which has a process definition with a key like the given value.
   *
   * - `processDefinitionKey`: Only return tasks which are part of a process instance which has a process definition with the given key.
   *
   * - `processDefinitionId`: Only return tasks which are part of a process instance which has a process definition with the given id.
   *
   * - `priority`: priority
   *
   * - `ownerLike`: ownerLike
   *
   * - `owner`: owner
   *
   * - `nameLike`: nameLike
   *
   * - `name`: name
   *
   * - `minimumPriority`: minimumPriority
   *
   * - `maximumPriority`: maximumPriority
   *
   * - `involvedUser`: involvedUser
   *
   * - `includeTaskLocalVariables`: Indication to include task local variables in the result.
   *
   * - `includeProcessVariables`: Indication to include process variables in the result.
   *
   * - `executionId`: Only return tasks which are part of the execution with the given id.
   *
   * - `excludeSubTasks`: Only return tasks that are not a subtask of another task.
   *
   * - `dueOn`: Only return tasks which are due on the given date.
   *
   * - `dueBefore`: Only return tasks which are due before the given date.
   *
   * - `dueAfter`: Only return tasks which are due after the given date.
   *
   * - `description`: description
   *
   * - `delegationState`: delegationState
   *
   * - `createdOn`: Only return tasks which are created on the given date.
   *
   * - `createdBefore`: Only return tasks which are created before the given date.
   *
   * - `createdAfter`: Only return tasks which are created after the given date.
   *
   * - `category`: Select tasks with the given category. Note that this is the task category, not the category of the process definition (namespace within the BPMN Xml).
   *
   * - `candidateUser`: candidateUser
   *
   * - `candidateOrAssigned`: Select tasks that has been claimed or assigned to user or waiting to claim by user (candidate user or groups).
   *
   * - `candidateGroups`: candidateGroups
   *
   * - `candidateGroup`: candidateGroup
   *
   * - `assigneeLike`: assigneeLike
   *
   * - `assignee`: assignee
   *
   * - `active`: If true, only return tasks that are not suspended (either part of a process that is not suspended or not part of a process at all). If false, only tasks that are part of suspended process instances are returned.
   *
   * @return OK
   */
  getTasksUsingGETResponse(params: QueryResourceService.GetTasksUsingGETParams): __Observable<__StrictHttpResponse<DataResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.withoutTenantId != null) __params = __params.set('withoutTenantId', params.withoutTenantId.toString());
    if (params.withoutDueDate != null) __params = __params.set('withoutDueDate', params.withoutDueDate.toString());
    if (params.unassigned != null) __params = __params.set('unassigned', params.unassigned.toString());
    if (params.tenantIdLike != null) __params = __params.set('tenantIdLike', params.tenantIdLike.toString());
    if (params.tenantId != null) __params = __params.set('tenantId', params.tenantId.toString());
    if (params.taskDefinitionKeyLike != null) __params = __params.set('taskDefinitionKeyLike', params.taskDefinitionKeyLike.toString());
    if (params.taskDefinitionKey != null) __params = __params.set('taskDefinitionKey', params.taskDefinitionKey.toString());
    if (params.processInstanceId != null) __params = __params.set('processInstanceId', params.processInstanceId.toString());
    if (params.processInstanceBusinessKeyLike != null) __params = __params.set('processInstanceBusinessKeyLike', params.processInstanceBusinessKeyLike.toString());
    if (params.processInstanceBusinessKey != null) __params = __params.set('processInstanceBusinessKey', params.processInstanceBusinessKey.toString());
    if (params.processDefinitionNameLike != null) __params = __params.set('processDefinitionNameLike', params.processDefinitionNameLike.toString());
    if (params.processDefinitionName != null) __params = __params.set('processDefinitionName', params.processDefinitionName.toString());
    if (params.processDefinitionKeyLike != null) __params = __params.set('processDefinitionKeyLike', params.processDefinitionKeyLike.toString());
    if (params.processDefinitionKey != null) __params = __params.set('processDefinitionKey', params.processDefinitionKey.toString());
    if (params.processDefinitionId != null) __params = __params.set('processDefinitionId', params.processDefinitionId.toString());
    if (params.priority != null) __params = __params.set('priority', params.priority.toString());
    if (params.ownerLike != null) __params = __params.set('ownerLike', params.ownerLike.toString());
    if (params.owner != null) __params = __params.set('owner', params.owner.toString());
    if (params.nameLike != null) __params = __params.set('nameLike', params.nameLike.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.minimumPriority != null) __params = __params.set('minimumPriority', params.minimumPriority.toString());
    if (params.maximumPriority != null) __params = __params.set('maximumPriority', params.maximumPriority.toString());
    if (params.involvedUser != null) __params = __params.set('involvedUser', params.involvedUser.toString());
    if (params.includeTaskLocalVariables != null) __params = __params.set('includeTaskLocalVariables', params.includeTaskLocalVariables.toString());
    if (params.includeProcessVariables != null) __params = __params.set('includeProcessVariables', params.includeProcessVariables.toString());
    if (params.executionId != null) __params = __params.set('executionId', params.executionId.toString());
    if (params.excludeSubTasks != null) __params = __params.set('excludeSubTasks', params.excludeSubTasks.toString());
    if (params.dueOn != null) __params = __params.set('dueOn', params.dueOn.toString());
    if (params.dueBefore != null) __params = __params.set('dueBefore', params.dueBefore.toString());
    if (params.dueAfter != null) __params = __params.set('dueAfter', params.dueAfter.toString());
    if (params.description != null) __params = __params.set('description', params.description.toString());
    if (params.delegationState != null) __params = __params.set('delegationState', params.delegationState.toString());
    if (params.createdOn != null) __params = __params.set('createdOn', params.createdOn.toString());
    if (params.createdBefore != null) __params = __params.set('createdBefore', params.createdBefore.toString());
    if (params.createdAfter != null) __params = __params.set('createdAfter', params.createdAfter.toString());
    if (params.category != null) __params = __params.set('category', params.category.toString());
    if (params.candidateUser != null) __params = __params.set('candidateUser', params.candidateUser.toString());
    if (params.candidateOrAssigned != null) __params = __params.set('candidateOrAssigned', params.candidateOrAssigned.toString());
    if (params.candidateGroups != null) __params = __params.set('candidateGroups', params.candidateGroups.toString());
    if (params.candidateGroup != null) __params = __params.set('candidateGroup', params.candidateGroup.toString());
    if (params.assigneeLike != null) __params = __params.set('assigneeLike', params.assigneeLike.toString());
    if (params.assignee != null) __params = __params.set('assignee', params.assignee.toString());
    if (params.active != null) __params = __params.set('active', params.active.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/tasks`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DataResponse>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.GetTasksUsingGETParams` containing the following parameters:
   *
   * - `withoutTenantId`: If true, only returns tasks without a tenantId set. If false, the withoutTenantId parameter is ignored.
   *
   * - `withoutDueDate`: Only return tasks which don�t have a due date. The property is ignored if the value is false.
   *
   * - `unassigned`: unassigned
   *
   * - `tenantIdLike`: Only return tasks with a tenantId like the given value.
   *
   * - `tenantId`: Only return tasks with the given tenantId.
   *
   * - `taskDefinitionKeyLike`: taskDefinitionKeyLike
   *
   * - `taskDefinitionKey`: taskDefinitionKey
   *
   * - `processInstanceId`: processInstanceId
   *
   * - `processInstanceBusinessKeyLike`: processInstanceBusinessKeyLike
   *
   * - `processInstanceBusinessKey`: processInstanceBusinessKey
   *
   * - `processDefinitionNameLike`: Only return tasks which are part of a process instance which has a process definition with a name like the given value.
   *
   * - `processDefinitionName`: Only return tasks which are part of a process instance which has a process definition with the given name.
   *
   * - `processDefinitionKeyLike`: Only return tasks which are part of a process instance which has a process definition with a key like the given value.
   *
   * - `processDefinitionKey`: Only return tasks which are part of a process instance which has a process definition with the given key.
   *
   * - `processDefinitionId`: Only return tasks which are part of a process instance which has a process definition with the given id.
   *
   * - `priority`: priority
   *
   * - `ownerLike`: ownerLike
   *
   * - `owner`: owner
   *
   * - `nameLike`: nameLike
   *
   * - `name`: name
   *
   * - `minimumPriority`: minimumPriority
   *
   * - `maximumPriority`: maximumPriority
   *
   * - `involvedUser`: involvedUser
   *
   * - `includeTaskLocalVariables`: Indication to include task local variables in the result.
   *
   * - `includeProcessVariables`: Indication to include process variables in the result.
   *
   * - `executionId`: Only return tasks which are part of the execution with the given id.
   *
   * - `excludeSubTasks`: Only return tasks that are not a subtask of another task.
   *
   * - `dueOn`: Only return tasks which are due on the given date.
   *
   * - `dueBefore`: Only return tasks which are due before the given date.
   *
   * - `dueAfter`: Only return tasks which are due after the given date.
   *
   * - `description`: description
   *
   * - `delegationState`: delegationState
   *
   * - `createdOn`: Only return tasks which are created on the given date.
   *
   * - `createdBefore`: Only return tasks which are created before the given date.
   *
   * - `createdAfter`: Only return tasks which are created after the given date.
   *
   * - `category`: Select tasks with the given category. Note that this is the task category, not the category of the process definition (namespace within the BPMN Xml).
   *
   * - `candidateUser`: candidateUser
   *
   * - `candidateOrAssigned`: Select tasks that has been claimed or assigned to user or waiting to claim by user (candidate user or groups).
   *
   * - `candidateGroups`: candidateGroups
   *
   * - `candidateGroup`: candidateGroup
   *
   * - `assigneeLike`: assigneeLike
   *
   * - `assignee`: assignee
   *
   * - `active`: If true, only return tasks that are not suspended (either part of a process that is not suspended or not part of a process at all). If false, only tasks that are part of suspended process instances are returned.
   *
   * @return OK
   */
  getTasksUsingGET(params: QueryResourceService.GetTasksUsingGETParams): __Observable<DataResponse> {
    return this.getTasksUsingGETResponse(params).pipe(
      __map(_r => _r.body as DataResponse)
    );
  }

  /**
   * @param processInstanceId processInstanceId
   * @return OK
   */
  getBookingDetailsUsingGETResponse(processInstanceId: string): __Observable<__StrictHttpResponse<DefaultInfoRequest>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/vehicle-booking-details/${processInstanceId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DefaultInfoRequest>;
      })
    );
  }
  /**
   * @param processInstanceId processInstanceId
   * @return OK
   */
  getBookingDetailsUsingGET(processInstanceId: string): __Observable<DefaultInfoRequest> {
    return this.getBookingDetailsUsingGETResponse(processInstanceId).pipe(
      __map(_r => _r.body as DefaultInfoRequest)
    );
  }
}

module QueryResourceService {

  /**
   * Parameters for searchByNearestLocationUsingGET
   */
  export interface SearchByNearestLocationUsingGETParams {

    /**
     * latLon
     */
    latLon: string;

    /**
     * kiloMeter
     */
    kiloMeter: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for getAllPendingBookingsUsingGET
   */
  export interface GetAllPendingBookingsUsingGETParams {

    /**
     * processInstanceId
     */
    processInstanceId?: string;

    /**
     * Only return tasks which are part of a process instance which has a process definition with the given key.
     */
    processDefinitionKey?: string;

    /**
     * Only return tasks which are part of a process instance which has a process definition with the given id.
     */
    processDefinitionId?: string;

    /**
     * nameLike
     */
    nameLike?: string;

    /**
     * name
     */
    name?: string;

    /**
     * Only return tasks which are created on the given date.
     */
    createdOn?: string;

    /**
     * Only return tasks which are created before the given date.
     */
    createdBefore?: string;

    /**
     * Only return tasks which are created after the given date.
     */
    createdAfter?: string;

    /**
     * candidateUser
     */
    candidateUser?: string;

    /**
     * candidateGroups
     */
    candidateGroups?: string;

    /**
     * candidateGroup
     */
    candidateGroup?: string;

    /**
     * assigneeLike
     */
    assigneeLike?: string;

    /**
     * assignee
     */
    assignee?: string;
  }

  /**
   * Parameters for getAllOpenBookingsUsingGET
   */
  export interface GetAllOpenBookingsUsingGETParams {

    /**
     * If true, only returns tasks without a tenantId set. If false, the withoutTenantId parameter is ignored.
     */
    withoutTenantId?: boolean;

    /**
     * Only return tasks which don�t have a due date. The property is ignored if the value is false.
     */
    withoutDueDate?: boolean;

    /**
     * unassigned
     */
    unassigned?: string;

    /**
     * Only return tasks with a tenantId like the given value.
     */
    tenantIdLike?: string;

    /**
     * Only return tasks with the given tenantId.
     */
    tenantId?: string;

    /**
     * taskDefinitionKeyLike
     */
    taskDefinitionKeyLike?: string;

    /**
     * taskDefinitionKey
     */
    taskDefinitionKey?: string;

    /**
     * processInstanceId
     */
    processInstanceId?: string;

    /**
     * processInstanceBusinessKeyLike
     */
    processInstanceBusinessKeyLike?: string;

    /**
     * processInstanceBusinessKey
     */
    processInstanceBusinessKey?: string;

    /**
     * Only return tasks which are part of a process instance which has a process definition with a name like the given value.
     */
    processDefinitionNameLike?: string;

    /**
     * Only return tasks which are part of a process instance which has a process definition with the given name.
     */
    processDefinitionName?: string;

    /**
     * Only return tasks which are part of a process instance which has a process definition with a key like the given value.
     */
    processDefinitionKeyLike?: string;

    /**
     * Only return tasks which are part of a process instance which has a process definition with the given key.
     */
    processDefinitionKey?: string;

    /**
     * Only return tasks which are part of a process instance which has a process definition with the given id.
     */
    processDefinitionId?: string;

    /**
     * priority
     */
    priority?: string;

    /**
     * ownerLike
     */
    ownerLike?: string;

    /**
     * owner
     */
    owner?: string;

    /**
     * nameLike
     */
    nameLike?: string;

    /**
     * name
     */
    name?: string;

    /**
     * minimumPriority
     */
    minimumPriority?: string;

    /**
     * maximumPriority
     */
    maximumPriority?: string;

    /**
     * involvedUser
     */
    involvedUser?: string;

    /**
     * Indication to include task local variables in the result.
     */
    includeTaskLocalVariables?: boolean;

    /**
     * Indication to include process variables in the result.
     */
    includeProcessVariables?: boolean;

    /**
     * Only return tasks which are part of the execution with the given id.
     */
    executionId?: string;

    /**
     * Only return tasks that are not a subtask of another task.
     */
    excludeSubTasks?: boolean;

    /**
     * Only return tasks which are due on the given date.
     */
    dueOn?: string;

    /**
     * Only return tasks which are due before the given date.
     */
    dueBefore?: string;

    /**
     * Only return tasks which are due after the given date.
     */
    dueAfter?: string;

    /**
     * description
     */
    description?: string;

    /**
     * delegationState
     */
    delegationState?: string;

    /**
     * Only return tasks which are created on the given date.
     */
    createdOn?: string;

    /**
     * Only return tasks which are created before the given date.
     */
    createdBefore?: string;

    /**
     * Only return tasks which are created after the given date.
     */
    createdAfter?: string;

    /**
     * Select tasks with the given category. Note that this is the task category, not the category of the process definition (namespace within the BPMN Xml).
     */
    category?: string;

    /**
     * candidateUser
     */
    candidateUser?: string;

    /**
     * Select tasks that has been claimed or assigned to user or waiting to claim by user (candidate user or groups).
     */
    candidateOrAssigned?: string;

    /**
     * candidateGroups
     */
    candidateGroups?: string;

    /**
     * candidateGroup
     */
    candidateGroup?: string;

    /**
     * assigneeLike
     */
    assigneeLike?: string;

    /**
     * assignee
     */
    assignee?: string;

    /**
     * If true, only return tasks that are not suspended (either part of a process that is not suspended or not part of a process at all). If false, only tasks that are part of suspended process instances are returned.
     */
    active?: boolean;
  }

  /**
   * Parameters for getTasksUsingGET
   */
  export interface GetTasksUsingGETParams {

    /**
     * If true, only returns tasks without a tenantId set. If false, the withoutTenantId parameter is ignored.
     */
    withoutTenantId?: boolean;

    /**
     * Only return tasks which don�t have a due date. The property is ignored if the value is false.
     */
    withoutDueDate?: boolean;

    /**
     * unassigned
     */
    unassigned?: string;

    /**
     * Only return tasks with a tenantId like the given value.
     */
    tenantIdLike?: string;

    /**
     * Only return tasks with the given tenantId.
     */
    tenantId?: string;

    /**
     * taskDefinitionKeyLike
     */
    taskDefinitionKeyLike?: string;

    /**
     * taskDefinitionKey
     */
    taskDefinitionKey?: string;

    /**
     * processInstanceId
     */
    processInstanceId?: string;

    /**
     * processInstanceBusinessKeyLike
     */
    processInstanceBusinessKeyLike?: string;

    /**
     * processInstanceBusinessKey
     */
    processInstanceBusinessKey?: string;

    /**
     * Only return tasks which are part of a process instance which has a process definition with a name like the given value.
     */
    processDefinitionNameLike?: string;

    /**
     * Only return tasks which are part of a process instance which has a process definition with the given name.
     */
    processDefinitionName?: string;

    /**
     * Only return tasks which are part of a process instance which has a process definition with a key like the given value.
     */
    processDefinitionKeyLike?: string;

    /**
     * Only return tasks which are part of a process instance which has a process definition with the given key.
     */
    processDefinitionKey?: string;

    /**
     * Only return tasks which are part of a process instance which has a process definition with the given id.
     */
    processDefinitionId?: string;

    /**
     * priority
     */
    priority?: string;

    /**
     * ownerLike
     */
    ownerLike?: string;

    /**
     * owner
     */
    owner?: string;

    /**
     * nameLike
     */
    nameLike?: string;

    /**
     * name
     */
    name?: string;

    /**
     * minimumPriority
     */
    minimumPriority?: string;

    /**
     * maximumPriority
     */
    maximumPriority?: string;

    /**
     * involvedUser
     */
    involvedUser?: string;

    /**
     * Indication to include task local variables in the result.
     */
    includeTaskLocalVariables?: boolean;

    /**
     * Indication to include process variables in the result.
     */
    includeProcessVariables?: boolean;

    /**
     * Only return tasks which are part of the execution with the given id.
     */
    executionId?: string;

    /**
     * Only return tasks that are not a subtask of another task.
     */
    excludeSubTasks?: boolean;

    /**
     * Only return tasks which are due on the given date.
     */
    dueOn?: string;

    /**
     * Only return tasks which are due before the given date.
     */
    dueBefore?: string;

    /**
     * Only return tasks which are due after the given date.
     */
    dueAfter?: string;

    /**
     * description
     */
    description?: string;

    /**
     * delegationState
     */
    delegationState?: string;

    /**
     * Only return tasks which are created on the given date.
     */
    createdOn?: string;

    /**
     * Only return tasks which are created before the given date.
     */
    createdBefore?: string;

    /**
     * Only return tasks which are created after the given date.
     */
    createdAfter?: string;

    /**
     * Select tasks with the given category. Note that this is the task category, not the category of the process definition (namespace within the BPMN Xml).
     */
    category?: string;

    /**
     * candidateUser
     */
    candidateUser?: string;

    /**
     * Select tasks that has been claimed or assigned to user or waiting to claim by user (candidate user or groups).
     */
    candidateOrAssigned?: string;

    /**
     * candidateGroups
     */
    candidateGroups?: string;

    /**
     * candidateGroup
     */
    candidateGroup?: string;

    /**
     * assigneeLike
     */
    assigneeLike?: string;

    /**
     * assignee
     */
    assignee?: string;

    /**
     * If true, only return tasks that are not suspended (either part of a process that is not suspended or not part of a process at all). If false, only tasks that are part of suspended process instances are returned.
     */
    active?: boolean;
  }
}

export { QueryResourceService }
