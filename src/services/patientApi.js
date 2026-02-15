import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const patientApi = createApi({
  reducerPath: "patientApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (build) => ({
    // get patient
    getPatients: build.query({
      query: () => "/patient",
    }),
    // add patient
    createPatient: build.mutation({
      query: (body) => ({
        url: "patient",
        method: "POST",
        body,
      }),
    }),
    // update patient
    updatePatient: build.mutation({
      query: (body) => {
        const { id } = patient;
        return {
          url: `/patient/${id}`,
          method: "PATCH",
          body,
        };
      },
    }),

    //    delete patient

    deletePatient: build.mutation({
      query: (body) => ({
        url: `/patient/${id}`,
        method: "DELETE",
        body,
      }),
    }),
    //
  }),
});

export const {
  useGetPatientsQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} = patientApi;
