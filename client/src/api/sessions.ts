import {
  Credentials,
  EditUserPayload,
  SessionResponse,
  UserResponse,
} from "../types/sessions";
import axiosInstance from "./axios";

const LOGIN_URL = "oauth/token";
const EDIT_USER_URL = "users";
const UPDATE_PASSWORD_URL = "users/update_password";
const UPDATE_AVATAR_URL = "users/update_avatar";
const LOGOUT_URL = "oauth/revoke";
const CURRENT_USER_URL = "users/me";
// const SIGNUP_URL = "users";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

export async function loginWithCredentials(credentials: {
  email: string;
  password: string;
}): Promise<SessionResponse> {
  const data = {
    email: credentials?.email,
    password: credentials?.password,
    grant_type: "password",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  return axiosInstance
    .post(LOGIN_URL, data)
    .then((response) => {
      return { ...response.data, errors: [] };
    })
    .catch((error) => {
      if (error.response?.data) return error.response.data;

      return { errors: ["Erro ao fazer login"] };
    });
}

export async function requestAccessTokenWithRefreshToken(
  token: string
): Promise<SessionResponse> {
  const data = {
    grant_type: "refresh_token",
    refresh_token: token,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  return axiosInstance
    .post(LOGIN_URL, data)
    .then((response) => {
      return { ...response.data, errors: [] };
    })
    .catch((error) => {
      if (error.response?.data)
        return { errors: ["Sessão expirada, faça login novamente"] };

      return { errors: ["Erro no servidor"] };
    });
}

export async function logoutUserWithToken(
  refreshToken: string
): Promise<{ errors?: string }> {
  const data = {
    token: refreshToken,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  return axiosInstance
    .post(LOGOUT_URL, data)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response?.data) return error.response.data;

      return { errors: ["Erro no servidor"] };
    });
}

export async function getCurrentUser(
  accessToken: string
): Promise<UserResponse> {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}`, Client: CLIENT_ID },
  };

  return axiosInstance
    .get(CURRENT_USER_URL, config)
    .then((response) => {
      return { ...response.data, errors: [] };
    })
    .catch((error) => {
      if (error.response?.data) return error.response.data;

      return { errors: ["Erro no servidor"] };
    });
}

export async function editUserWithToken(
  payload: Credentials
): Promise<UserResponse> {
  const data: EditUserPayload = {
    registration: {},
  };

  if (payload?.firstName) data.registration.first_name = payload.firstName;
  if (payload?.lastName) data.registration.last_name = payload.lastName;
  if (payload?.email) data.registration.email = payload.email;
  if (payload?.defaultLocationId)
    data.registration.default_location_id = payload.defaultLocationId;

  const config = {
    headers: {
      Authorization: `Bearer ${payload.accessToken}`,
      Client: CLIENT_ID,
    },
  };

  return axiosInstance
    .patch(EDIT_USER_URL, data, config)
    .then((response) => response.data)
    .catch((error) => error.response.data);
}

export async function editUserPassword(
  payload: Credentials
): Promise<UserResponse> {
  const data: EditUserPayload = {
    registration: {},
  };

  if (payload?.currentPassword)
    data.registration.current_password = payload.currentPassword;
  if (payload?.password) data.registration.password = payload.password;
  if (payload?.passwordConfirmation)
    data.registration.password_confirmation = payload.passwordConfirmation;

  const config = {
    headers: {
      Authorization: `Bearer ${payload.accessToken}`,
      Client: CLIENT_ID,
    },
  };

  return axiosInstance
    .patch(UPDATE_PASSWORD_URL, data, config)
    .then((response) => response.data)
    .catch((error) => error.response.data);
}

export async function editAvatar({
  formData,
  accessToken,
}: {
  formData: FormData;
  accessToken: string;
}): Promise<UserResponse> {
  // append client id to form data
  formData.append("client_id", CLIENT_ID);

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Client: CLIENT_ID,
      "Content-Type": "multipart/form-data",
    },
  };

  return axiosInstance
    .patch(UPDATE_AVATAR_URL, formData, config)
    .then((response) => response.data)
    .catch((error) => error.response.data);
}

// export async function signUpUser(credentials: Credentials) {
//   const data = {
//     registration: {
//       first_name: credentials?.firstName,
//       last_name: credentials?.lastName,
//       email: credentials?.email,
//       password: credentials?.password,
//       password_confirmation: credentials?.passwordConfirmation,
//     },
//     client_id: CLIENT_ID,
//   };

//   return axiosInstance
//     .post(SIGNUP_URL, data)
//     .then((response) => response.data)
//     .catch((error) => error.response.data);
// }
