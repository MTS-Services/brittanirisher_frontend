import { apiSlice } from '../../../apiSlice';


const CoupledashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVendorStatus: builder.query({
    query: () => ({   url: `/vendor-profiles/my/profile`,
        method: 'GET',
      }),
    })
    }),
});
