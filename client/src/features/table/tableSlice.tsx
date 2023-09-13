import { createSlice } from "@reduxjs/toolkit";

export type ResourceName = "contact" | null;

interface SelectState {
  resource: ResourceName;
  resources: Array<number>;
  selectAll: boolean;
  selected: Array<number>;
  editModal: number | null;
  deleteModal: Array<number>;
  addModal: boolean;
  perPage: string;
  page: number;
}

const initialState: SelectState = {
  resource: null,
  resources: [],
  selectAll: false,
  selected: [],
  editModal: null,
  deleteModal: [],
  addModal: false,
  perPage: "10",
  page: 1,
};

const tableSlice = createSlice({
  name: "select",
  initialState,
  reducers: {
    resetTableState: (state) => {
      state.resources = [];
      state.selectAll = false;
      state.selected = [];
      state.perPage = "10";
      state.page = 1;
    },
    feedResources: (
      state,
      {
        payload: { ids },
      }: { payload: { ids: number[]; ownerId: number | null } }
    ) => {
      state.resources = ids;
    },
    toggleSelectAll: (state) => {
      state.selected = !state.selectAll ? state.resources : [];
      state.selectAll = !state.selectAll;
    },
    setSelected: (state, { payload }) => {
      if (!payload) {
        state.selected = [];
        state.selectAll = false;
        return;
      }

      if (state.selected.includes(payload)) {
        state.selected = state.selected.filter((id) => id !== payload);
        state.selectAll = false;
        return;
      }

      state.selected.push(payload);
      state.selectAll = state.selected.length === state.resources.length;
    },
    setEditModal: (
      state,
      { payload }: { payload: { resource: ResourceName; state: number | null } }
    ) => {
      state.editModal = payload.state;
      state.resource = payload.resource;
    },
    setDeleteModal: (state, { payload }: { payload: number | null }) => {
      if (!payload) {
        state.deleteModal = [];
        return;
      }

      state.deleteModal = [payload];
    },
    deleteSelected: (state) => {
      state.deleteModal = state.selected;
    },
    setAddModal: (
      state,
      { payload }: { payload: { resource: ResourceName; state: boolean } }
    ) => {
      state.addModal = payload.state;
      state.resource = payload.resource;
    },
    setPerPage: (state, { payload }) => {
      state.perPage = payload;
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
  },
});

export const {
  resetTableState,
  feedResources,
  toggleSelectAll,
  setSelected,
  setEditModal,
  setDeleteModal,
  deleteSelected,
  setAddModal,
  setPerPage,
  setPage,
} = tableSlice.actions;

export default tableSlice.reducer;
