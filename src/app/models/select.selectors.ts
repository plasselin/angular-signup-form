import data from './data.json';

export interface Countries {
  name: string;
  abbreviation: string;
  provinces: Provinces[];
}

export interface Provinces {
  name: string;
  abbreviation: string;
}
