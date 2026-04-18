import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import agenciesReducer from "../features/agencies/agenciesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    agencies: agenciesReducer,
  },
});