export interface Location {
  id: number;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  latitude: number;
  longitude: number;
}

export interface LocationResponse {
  location: Location;
}

export interface LocationsResponse {
  locations: Location[];
}

export interface LocationPayload {
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  latitude: number;
  longitude: number;
}
