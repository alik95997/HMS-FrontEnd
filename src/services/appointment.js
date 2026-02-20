import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  tagTypes: ["Appointments"],
  endpoints: (build) => ({
    getApointment: build.query({
      query: () => "appointment",
      providesTags: ["Appointments"],
    }),
    // add doctor
    createApointment: build.mutation({
      query: (newAppointment) => ({
        url: "appointment",
        method: "POST",
        body: newAppointment,
      }),
      invalidatesTags: ["Appointments"],
    }),
    // update doctor
    updateAppointment: build.mutation({
      query: (newAppointment) => {
        const { _id } = newAppointment;
        return {
          url: `/appointment/${_id}`,
          method: "PATCH",
          body: newAppointment,
        };
      },
      invalidatesTags: ["Appointments"],
    }),
    // delete doctor
    deleteApointment: build.mutation({
      query: (id) => ({
        url: `appointment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Appointments"],
    }),
  }),
});

export const {
  useGetApointmentQuery,
  useCreateApointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteApointmentMutation,
} = appointmentApi;
