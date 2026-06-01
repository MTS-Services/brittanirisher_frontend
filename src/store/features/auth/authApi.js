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
  }),
});

export const {
  useLoginMutation,
  useCreateCoupleProfileMutation,
  useGetWeddingStylesQuery,
} = authApi;
