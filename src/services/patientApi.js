import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const patientApi = createApi({
  reducerPath: "patientApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  tagTypes: ["Patients"],
  endpoints: (build) => ({
    // get patient
    getPatients: build.query({
      query: () => "patient",
      providesTags: ["Patients"],
    }),
    // add patient
    createPatient: build.mutation({
      query: (newPatient) => ({
        url: "patient",
        method: "POST",
        body: newPatient,
      }),
      invalidatesTags: ["Patients"],
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
      invalidatesTags: ["Patients"],
    }),

    //    delete patient

    deletePatient: build.mutation({
      query: (id) => ({
        url: `patient/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Patients"],
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
