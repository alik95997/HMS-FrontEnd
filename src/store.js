import { configureStore } from "@reduxjs/toolkit";
import { patientApi } from "./services/patient";
import { doctorApi } from "./services/doctor";
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
