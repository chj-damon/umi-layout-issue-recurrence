import { Location } from 'history';

export interface CustomLocation extends Location {
  query: {
    [x: string]: string;
  };
}
