import { apiSlice } from '../../apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    getWeddingStyles: builder.query({
      query: () => ({
        url: '/wedding-styles',
        method: 'GET',
      }),
      providesTags: ['WeddingStyle'],
    }),
    createCoupleProfile: builder.mutation({
      query: (body) => ({
        url: '/couple-profiles',
        method: 'POST',
        body,
      }),
    }),
    createVendorProfile: builder.mutation({
      query: (body) => ({
        url: '/vendor-profiles',
        method: 'POST',
        body, // FormData — do NOT set Content-Type manually
        formData: true, // Custom flag to indicate FormData usage
      }),
    }),
    getTokenByEmail: builder.mutation({
      query: (body) => ({
        url: '/auth/get-token',
        method: 'POST',
        body,
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: '/auth/change-password',
        method: 'POST',
        body,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: '/auth/profile',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: '/auth/profile',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateCoupleProfileMutation,
  useGetWeddingStylesQuery,
  useChangePasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetTokenByEmailMutation,

} = authApi;
