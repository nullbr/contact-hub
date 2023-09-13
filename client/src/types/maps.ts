export type Coordinates = {
  lat: number;
  lng: number;
};

export type MarkerProp = {
  position: Coordinates;
  title: string;
  id?: number;
};
