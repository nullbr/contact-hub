export interface Credentials {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  passwordConfirmation?: string;
  currentPassword?: string;
  defaultLocationId?: number;
  accessToken: string;
  refreshToken?: string;
  expires?: number;
}

export interface SessionDetails {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  created_at: number;
}

export interface UserDetails {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: "user" | "admin";
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
}

export interface EditUserPayload {
  registration: {
    email?: string;
    password?: string;
    password_confirmation?: string;
    current_password?: string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string | null;
  };
}

export interface UserResponse {
  user: UserDetails;
  errors: Array<string>;
}

export interface SessionResponse extends SessionDetails {
  errors: Array<string> | [];
}

export interface CreateUserResponse {
  user: UserDetails;
  session: SessionDetails;
  errors: Array<string>;
}
