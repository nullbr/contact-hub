export interface Location {
  id: number;
  city: string;
  state: string;
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
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}
