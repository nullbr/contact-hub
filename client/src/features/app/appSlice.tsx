import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  language: "pt";
  loadedMapsScript: boolean;
  loadMapsScriptError: boolean;
  openNav: boolean;
}

const initialState: AppState = {
  language: "pt",
  loadedMapsScript: false,
  loadMapsScriptError: false,
  openNav: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoadScript(state, { payload }: { payload: boolean }) {
      state.loadedMapsScript = payload;
    },
    setOpenNav(state, { payload }: { payload: boolean }) {
      state.openNav = payload;
    },
  },
});

export const { setLoadScript, setOpenNav } = appSlice.actions;

export default appSlice.reducer;
