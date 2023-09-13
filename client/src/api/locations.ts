import {
  LocationPayload,
  LocationResponse,
  LocationsResponse,
} from "../types/locations";
import axiosInstance from "./axios";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

const LOCATIONS_URL = "/locations";

// get all locations from current user
export async function getLocations({
  accessToken,
  debounceSearch,
  sortParams,
  page,
  perPage,
}: {
  accessToken: string | null;
  debounceSearch?: string | null;
  sortParams?: { sort?: string; order?: string };
  page?: number;
  perPage?: string;
}): Promise<LocationsResponse> {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}`, Client: CLIENT_ID },
    params: { ...sortParams, page, per_page: perPage, search: debounceSearch },
  };

  return axiosInstance.get(LOCATIONS_URL, config).then((response) => {
    return { ...response.data };
  });
}

// create a new location
export async function createLocation({
  accessToken,
  payload,
}: {
  accessToken: string | null;
  payload: LocationPayload;
}): Promise<LocationResponse> {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}`, Client: CLIENT_ID },
  };

  return axiosInstance.post(LOCATIONS_URL, payload, config).then((response) => {
    return { ...response.data };
  });
}
