/* tslint:disable */
import { URI } from './uri';
export interface ServiceInstance {
  host?: string;
  metadata?: {[key: string]: string};
  port?: number;
  scheme?: string;
  secure?: boolean;
  serviceId?: string;
  uri?: URI;
}
