import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  loginWithCredentials,
  logoutUserWithToken,
  requestAccessTokenWithRefreshToken,
} from "../../api/sessions";
import { SessionResponse, UserResponse } from "../../types/sessions";

type Messages = {
  success?: Array<string>;
  error?: Array<string>;
};
export interface SessionState {
  currentUser: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: "user" | "admin";
    createdAt: string;
    avatarUrl: string | null;
  };
  loading: boolean;
  error: boolean;
  messages: Messages;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  createdAt: number | null;
  tokenType: string | null;
}

const initialState: SessionState = {
  currentUser: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    role: "user",
    createdAt: "",
    avatarUrl: null,
  },
  loading: true,
  error: false,
  messages: {},
  accessToken: null,
  refreshToken: getRefreshToken(),
  createdAt: null,
  expiresAt: null,
  tokenType: null,
};

// log in user with email and password
export const loginUser = createAsyncThunk(
  "session/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    const loginResponse = await loginWithCredentials(credentials);

    if (loginResponse.errors.length > 0)
      return rejectWithValue(loginResponse.errors);

    const userResponse = await getCurrentUser(loginResponse.access_token);

    if (userResponse.errors.length > 0)
      return rejectWithValue(userResponse.errors);

    return { session: loginResponse, user: userResponse };
  }
);

// log in user with refresh token
export const refreshAccessToken = createAsyncThunk(
  "session/refreshAccessToken",
  async (
    { refreshToken }: { refreshToken: string | null },
    { rejectWithValue }
  ) => {
    if (!refreshToken) return rejectWithValue(["Acesso não autorizado"]);

    const refreshResponse =
      await requestAccessTokenWithRefreshToken(refreshToken);

    if (refreshResponse.errors.length > 0)
      return rejectWithValue(refreshResponse.errors);

    const userResponse = await getCurrentUser(refreshResponse.access_token);

    if (userResponse.errors.length > 0)
      return rejectWithValue(userResponse.errors);

    return { session: refreshResponse, user: userResponse };
  }
);

export const logoutUser = createAsyncThunk(
  "session/logoutUser",
  async (
    { refreshToken }: { refreshToken: string | null },
    { rejectWithValue }
  ) => {
    if (!refreshToken) return rejectWithValue(["Acesso não autorizado"]);

    const response = await logoutUserWithToken(refreshToken);

    if (response.errors) {
      return rejectWithValue(response.errors);
    }

    return response;
  }
);

const sessionSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    resetErrorState: (state) => {
      state.error = false;
      state.messages = initialState.messages;
    },
    loadingFalse: (state) => {
      state.loading = false;
    },
    updateUser: (state, { payload }) => {
      state.currentUser = {
        id: payload.id,
        email: payload.email,
        firstName: payload.first_name,
        lastName: payload.last_name,
        role: payload.role,
        createdAt: payload.created_at,
        avatarUrl: payload.avatar_url,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.messages = {};
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const session = payload.session as SessionResponse;
        const user = payload.user as UserResponse;

        state.currentUser = {
          id: user.user.id,
          email: user.user.email,
          firstName: user.user.first_name,
          lastName: user.user.last_name,
          role: user.user.role,
          createdAt: user.user.created_at,
          avatarUrl: user.user.avatar_url,
        };
        state.accessToken = session.access_token;
        state.refreshToken = session.refresh_token;
        state.expiresAt = getExpirationTime(session.expires_in);
        state.tokenType = session.token_type;
        state.createdAt = session.created_at;

        storeRefreshToken(session.refresh_token);

        state.loading = false;
        state.error = false;
        state.messages = { success: ["Login realizado com sucesso"] };
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.messages = { success: [], error: payload as Array<string> };
      })
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.messages = initialState.messages;
      })
      .addCase(refreshAccessToken.fulfilled, (state, { payload }) => {
        const session = payload.session as SessionResponse;
        const user = payload.user as UserResponse;

        state.currentUser = {
          id: user.user.id,
          email: user.user.email,
          firstName: user.user.first_name,
          lastName: user.user.last_name,
          role: user.user.role,
          createdAt: user.user.created_at as string,
          avatarUrl: user.user.avatar_url,
        };
        state.accessToken = session.access_token;
        state.refreshToken = session.refresh_token;
        state.expiresAt = getExpirationTime(session.expires_in);
        state.tokenType = session.token_type;
        state.createdAt = session.created_at;

        storeRefreshToken(session.refresh_token);

        state.loading = false;
        state.error = false;
        state.messages = {};
      })
      .addCase(refreshAccessToken.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.messages = { error: payload as Array<string> };
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.messages = initialState.messages;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = initialState.currentUser;
        state.accessToken = initialState.accessToken;
        state.refreshToken = null;
        state.expiresAt = initialState.expiresAt;

        removeRefreshToken();

        state.loading = false;
        state.error = false;
        state.messages = {
          success: ["Logout realizado com sucesso"],
        };
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.messages = { error: payload as string[] };
      });
  },
});

export const { resetErrorState, loadingFalse, updateUser } =
  sessionSlice.actions;

export default sessionSlice.reducer;

function storeRefreshToken(token: string) {
  localStorage.setItem("refreshToken", token);
}

function removeRefreshToken() {
  localStorage.removeItem("refreshToken");
}

function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

function getExpirationTime(expiresIn: number) {
  return Date.now() + expiresIn * 1000;
}
