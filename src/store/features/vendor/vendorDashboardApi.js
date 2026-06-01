import { apiSlice } from '../../../apiSlice';


const vendordashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVendorStatus: builder.query({
  query: () => ({
        url: `/vendor-profiles/my/profile`,
        method: 'GET',
      }),


    })
    }),
});

export const { useGetVendorStatusQuery } = vendordashboardApi;