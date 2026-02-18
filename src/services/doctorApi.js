import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  tagTypes: ["Doctor"],
  endpoints: (build) => ({
    getDoctors: build.query({
      query: () => "doctor",
    }),
    // add doctor
    addDoctor: build.mutation({
      query: (newDoctor) => ({
        url: "patient",
        method: "POST",
        body: newDoctor,
      }),
    }),
    // update doctor
    updateDoctor: build.mutation({
      query: (newDoctor) => {
        const { _id } = newDoctor;
        return {
          url: `/doctor/${_id}`,
          method: "PATCH",
          body: newDoctor,
        };
      },
    }),
    // delete doctor
    deleteDoctor: build.mutation({
      query: (id) => ({
        url: `doctor/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useAddDoctorMutation,
  useDeleteDoctorMutation,
  useUpdateDoctorMutation,
} = doctorApi;
