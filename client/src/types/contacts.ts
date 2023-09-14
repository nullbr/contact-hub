import { Location, LocationPayload } from "./locations";
import { UserDetails } from "./sessions";

export interface ContactParams {
  id: number;
  name: string;
  cpf: string;
  phone_number: string;
  location: Location;
  user: UserDetails;
}

export interface ContactResponse {
  contact: ContactParams;
}

export interface ContactsResponse {
  contacts: ContactParams[];
  pages: number;
  page: number;
  prev: number | null;
  next: number | null;
  count: number;
  from: number;
  to: number;
  ids: number[];
}

export interface CreateContactPayload {
  contact: {
    name: string;
    cpf: string | null;
    phone_number: string;
  };
  location: LocationPayload;
}

export interface EditContactPayload {
  contact: {
    name?: string;
    cpf?: string;
    phone_number?: string;
  };
  location?: LocationPayload;
}
