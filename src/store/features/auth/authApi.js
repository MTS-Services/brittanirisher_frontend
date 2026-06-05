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
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: '/auth/change-password',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateCoupleProfileMutation,
  useGetWeddingStylesQuery,
    useCreateVendorProfileMutation,
    useChangePasswordMutation,

} = authApi;
