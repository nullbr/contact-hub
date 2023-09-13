import { configureStore, combineReducers } from "@reduxjs/toolkit";
import sessionReducer from "./features/sessions/sessionSlice";
import appReducer from "./features/app/appSlice";

const rootReducer = combineReducers({
  sessions: sessionReducer,
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
