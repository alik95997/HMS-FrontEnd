import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const patientApi = createApi({
  reducerPath: "patientApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),

  endpoints: (build) => ({
    // get patient
    getPatients: build.query({
      query: () => "patient",
    }),
    // add patient
    createPatient: build.mutation({
      query: (newPatient) => ({
        url: "patient",
        method: "POST",
        body: newPatient,
      }),
    }),
    // update patient
    updatePatient: build.mutation({
      query: (updatedPatient) => {
        const { _id } = updatedPatient;
        return {
          url: `/patient/${_id}`,
          method: "PATCH",
          body: updatedPatient,
        };
      },
    }),

    //    delete patient

    deletePatient: build.mutation({
      query: (id) => ({
        url: `patient/${id}`,
        method: "DELETE",
        body: id,
      }),
    }),
    //
  }),
});

export const {
  useCreatePatientMutation,
  useGetPatientsQuery,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} = patientApi;
