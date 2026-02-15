import { configureStore } from "@reduxjs/toolkit";
import { patientApi } from "./services/patientApi";
import { doctorApi } from "./services/doctorApi";
export const store = configureStore({
  reducer: {
    [patientApi.reducerPath]: patientApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      patientApi.middleware,
      doctorApi.middleware,
    ]),
});
