import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: () => "/doctor",
    }),
  }),
});

export const { useGetDoctorsQuery } = doctorApi;
