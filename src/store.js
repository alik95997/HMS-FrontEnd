import { configureStore } from "@reduxjs/toolkit";
import { patientApi } from "./services/patientApi";
import { doctorApi } from "./services/doctorApi";
import { appointmentApi } from "./services/appointment";
export const store = configureStore({
  reducer: {
    [patientApi.reducerPath]: patientApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      patientApi.middleware,
      doctorApi.middleware,
      appointmentApi.middleware,
    ]),
});
