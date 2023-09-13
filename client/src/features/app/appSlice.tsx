import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  language: "pt";
  loadedMapsScript: boolean;
  loadMapsScriptError: boolean;
}

const initialState: AppState = {
  language: "pt",
  loadedMapsScript: false,
  loadMapsScriptError: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoadScript(state, { payload }: { payload: boolean }) {
      state.loadedMapsScript = payload;
    },
  },
});

export const { setLoadScript } = appSlice.actions;

export default appSlice.reducer;
