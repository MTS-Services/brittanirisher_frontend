import { apiSlice } from '../../../apiSlice';

const adminMessageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminMessages: builder.query({
      query: (query) => ({
        url: `/message${query ? `?${query}` : ''}`,
        method: 'GET',
      }),
      providesTags: ['Message'],
    }),
    deleteAdminMessage: builder.mutation({
      query: ({ id }) => ({
        url: `/message/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Message'],
    }),
  }),
});

export const { useGetAdminMessagesQuery, useDeleteAdminMessageMutation } =
  adminMessageApi;
