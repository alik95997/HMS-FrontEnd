import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const patientApi = createApi({
  reducerPath: "patientApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    getPatients: builder.query({
      query: () => "/patient",
    }),
  }),
});

export const { useGetPatientsQuery } = patientApi;
