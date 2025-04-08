// src/features/api/instructorApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const instructorApi = createApi({
  reducerPath: 'instructorApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      // Get the token from state if available
      const token = getState().auth?.token;
      
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerInstructor: builder.mutation({
      query: (instructorData) => ({
        url: '/instructors/register',
        method: 'POST',
        body: instructorData,
      }),
    }),
    getInstructorProfile: builder.query({
      query: () => '/instructors/profile',
    }),
    updateInstructorProfile: builder.mutation({
      query: (profileData) => ({
        url: '/instructors/profile',
        method: 'PUT',
        body: profileData,
      }),
    }),
  }),
});

export const {
  useRegisterInstructorMutation,
  useGetInstructorProfileQuery,
  useUpdateInstructorProfileMutation,
} = instructorApi;