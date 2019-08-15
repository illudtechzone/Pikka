/* tslint:disable */
import { ServiceInstance } from './service-instance';
export interface RouteVM {
  path?: string;
  serviceId?: string;
  serviceInstances?: Array<ServiceInstance>;
}
