import {
  ContactResponse,
  ContactsResponse,
  CreateContactPayload,
  EditContactPayload,
} from "../types/contacts";
import axiosInstance from "./axios";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

const CHAPA_URL = "/contacts";
const DELETE_MULTIPLE_URL = "/contacts/destroy_multiple";

// get all contacts
export async function getContacts({
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
}): Promise<ContactsResponse> {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}`, Client: CLIENT_ID },
    params: { ...sortParams, page, per_page: perPage, search: debounceSearch },
  };

  return axiosInstance.get(CHAPA_URL, config).then((response) => response.data);
}

// get contact by id
export async function getContact({
  accessToken,
  id,
  showParties = false,
}: {
  accessToken: string | null;
  id: number | null;
  showParties?: boolean;
}): Promise<ContactResponse> {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}`, Client: CLIENT_ID },
    params: { show_parties: showParties },
  };

  return axiosInstance
    .get(`${CHAPA_URL}/${id}`, config)
    .then((response) => response.data);
}

// update contact
export async function editContact({
  accessToken,
  id,
  payload,
}: {
  accessToken: string | null;
  id: number | null;
  payload: EditContactPayload;
}): Promise<ContactResponse> {
  const data = {
    contact: payload.contact,
    location: payload.location,
  };

  const config = {
    headers: { Authorization: `Bearer ${accessToken}`, Client: CLIENT_ID },
  };

  return axiosInstance
    .put(`${CHAPA_URL}/${id}`, data, config)
    .then((response) => response.data);
}

// create contact
export async function createContact({
  accessToken,
  payload,
}: {
  accessToken: string | null;
  payload: CreateContactPayload;
}): Promise<ContactResponse> {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}`, Client: CLIENT_ID },
  };

  const data = {
    contact: payload.contact,
    location: payload.location,
  };

  return axiosInstance
    .post(CHAPA_URL, data, config)
    .then((response) => response.data);
}

// delete contact
export async function deleteContact({
  accessToken,
  id,
}: {
  accessToken: string | null;
  id: number;
}) {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}`, Client: CLIENT_ID },
  };

  return axiosInstance
    .delete(`${CHAPA_URL}/${id}`, config)
    .then((response) => response.data);
}

// delete multiple contacts
export async function deleteContacts({
  accessToken,
  ids,
}: {
  accessToken: string | null;
  ids: Array<number>;
}) {
  const payload = {
    ids,
  };

  const config = {
    headers: { Authorization: `Bearer ${accessToken}`, Client: CLIENT_ID },
  };

  return axiosInstance
    .put(DELETE_MULTIPLE_URL, payload, config)
    .then((response) => response.data);
}
