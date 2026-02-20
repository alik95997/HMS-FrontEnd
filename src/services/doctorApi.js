import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  tagTypes: ["Doctors"],
  endpoints: (build) => ({
    getDoctors: build.query({
      query: () => "doctor",
      providesTags: ["Doctors"],
    }),
    // add doctor
    addDoctor: build.mutation({
      query: (newDoctor) => ({
        url: "doctor",
        method: "POST",
        body: newDoctor,
      }),
      invalidatesTags: ["Doctors"],
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
      invalidatesTags: ["Doctors"],
    }),
    // delete doctor
    deleteDoctor: build.mutation({
      query: (id) => ({
        url: `doctor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctors"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useAddDoctorMutation,
  useDeleteDoctorMutation,
  useUpdateDoctorMutation,
} = doctorApi;
