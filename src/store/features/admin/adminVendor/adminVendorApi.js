import { apiSlice } from '../../../apiSlice';

const adminVendorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminVendor: builder.query({
      query: (query) => ({
        url: `/vendor-profiles/admin?${query}`,
        method: 'GET',
      }),
      providesTags: ['vendor'],
    }),
    updateVendorStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/vendor-profiles/status/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['vendor'],
    }),
    deleteVendor: builder.mutation({
      query: ({ id }) => ({
        url: `/vendor-profiles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['vendor'],
    }),
  }),
});

export const {
  useGetAdminVendorQuery,
  useUpdateVendorStatusMutation,
  useDeleteVendorMutation,
} = adminVendorApi;
