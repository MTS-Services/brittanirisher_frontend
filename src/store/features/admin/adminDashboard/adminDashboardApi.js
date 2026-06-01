import { apiSlice } from '../../../apiSlice';

const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStatus: builder.query({
      query: () => ({
        url: `/dashboard/admin-card`,
        method: 'GET',
      }),
    }),
    getAdminDashboardCharts: builder.query({
      query: (query) => ({
        url: `/dashboard/admin-chart?filter=${query || 'this_year'}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAdminStatusQuery, useGetAdminDashboardChartsQuery } =
  dashboardApi;
