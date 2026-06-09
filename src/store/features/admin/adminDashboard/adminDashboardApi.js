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
    getAdminCoupleProfiles: builder.query({
      query: (query) => ({
        url: `/couple-profiles${query ? `?${query}` : ''}`,
        method: 'GET',
      }),
    }),
    getAdminPaymentCard: builder.query({
      query: () => ({
        url: '/dashboard/admin-payment-card',
        method: 'GET',
      }),
    }),
    getAdminPaymentPurchases: builder.query({
      query: (query) => ({
        url: `/dashboard/admin-recent-subscriptions${query ? `?${query}` : ''}`,
        method: 'GET',
      }),
    }),
    getAdminSubscriptionPlans: builder.query({
      query: () => ({
        url: '/subscription-plans',
        method: 'GET',
      }),
      providesTags: ['SubscriptionPlan'],
    }),
    getAdminSubscriptionPlanById: builder.query({
      query: (id) => ({
        url: `/subscription-plans/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'SubscriptionPlan', id }],
    }),
    createAdminSubscriptionPlan: builder.mutation({
      query: (body) => ({
        url: '/subscription-plans',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SubscriptionPlan'],
    }),
    updateAdminSubscriptionPlan: builder.mutation({
      query: ({ id, body }) => ({
        url: `/subscription-plans/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['SubscriptionPlan'],
    }),
    deleteAdminSubscriptionPlan: builder.mutation({
      query: ({ id }) => ({
        url: `/subscription-plans/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SubscriptionPlan'],
    }),
    getAdminCategories: builder.query({
      query: () => ({
        url: '/categories',
        method: 'GET',
      }),
      providesTags: ['Category'],
    }),
    createAdminCategory: builder.mutation({
      query: (body) => ({
        url: '/categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Category'],
    }),
    deleteAdminCategory: builder.mutation({
      query: ({ id }) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
    getAdminWeddingStyles: builder.query({
      query: () => ({
        url: '/wedding-styles',
        method: 'GET',
      }),
      providesTags: ['WeddingStyle'],
    }),
    createAdminWeddingStyle: builder.mutation({
      query: (body) => ({
        url: '/wedding-styles',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['WeddingStyle'],
    }),
    deleteAdminWeddingStyle: builder.mutation({
      query: ({ id }) => ({
        url: `/wedding-styles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['WeddingStyle'],
    }),
  }),
});

export const {
  useGetAdminStatusQuery,
  useGetAdminDashboardChartsQuery,
  useGetAdminCoupleProfilesQuery,
  useGetAdminPaymentCardQuery,
  useGetAdminPaymentPurchasesQuery,
  useGetAdminSubscriptionPlansQuery,
  useGetAdminSubscriptionPlanByIdQuery,
  useLazyGetAdminSubscriptionPlanByIdQuery,
  useCreateAdminSubscriptionPlanMutation,
  useUpdateAdminSubscriptionPlanMutation,
  useDeleteAdminSubscriptionPlanMutation,
  useGetAdminCategoriesQuery,
  useCreateAdminCategoryMutation,
  useDeleteAdminCategoryMutation,
  useGetAdminWeddingStylesQuery,
  useCreateAdminWeddingStyleMutation,
  useDeleteAdminWeddingStyleMutation,
} = dashboardApi;
