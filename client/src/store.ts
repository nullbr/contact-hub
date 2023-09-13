import { configureStore, combineReducers } from "@reduxjs/toolkit";
import sessionReducer from "./features/sessions/sessionSlice";
import appReducer from "./features/app/appSlice";
import tableReducer from "./features/table/tableSlice";

const rootReducer = combineReducers({
  sessions: sessionReducer,
  app: appReducer,
  table: tableReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
