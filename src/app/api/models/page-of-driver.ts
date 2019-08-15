/* tslint:disable */
import { Driver } from './driver';
import { Sort } from './sort';
export interface PageOfDriver {
  content?: Array<Driver>;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
