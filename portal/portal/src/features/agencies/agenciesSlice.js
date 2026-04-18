import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "/api/portal/Agency"
export const fetchAgencies = createAsyncThunk(
  "agencies/fetchAgencies",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Erreur lors du chargement des agences");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Une erreur est survenue"
      );
    }
  }
);

const initialState = {
  agencies: [],
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 6,
};

const agenciesSlice = createSlice({
  name: "agencies",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    nextPage: (state) => {
      const totalPages = Math.ceil(state.agencies.length / state.itemsPerPage);
      if (state.currentPage < totalPages) {
        state.currentPage += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgencies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgencies.fulfilled, (state, action) => {
        state.loading = false;
        state.agencies = action.payload;
      })
      .addCase(fetchAgencies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Échec du chargement";
      });
  },
});

export const { setCurrentPage, nextPage } = agenciesSlice.actions;
export default agenciesSlice.reducer;