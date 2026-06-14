import { apiSlice } from '../../apiSlice';
export const coupleDashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVendorProfiles: builder.query({
      query: (params) => ({
        url: '/vendor-profiles',
        method: 'GET',
        params: params,
      }),
      providesTags: ['VendorProfile'],
    }),
    getVendorProfilesHome: builder.query({
      query: (params) => ({
        url: '/vendor-profiles/home',
        method: 'GET',
        params: params,
      }),
      providesTags: ['VendorProfile'],
    }),
    getVendorDetail: builder.query({
      query: (id) => ({
        url: `/vendor-profiles/${id}`,
        method: 'GET',
      }),
    }),
    sendEnquiry: builder.mutation({
      query: (enquiryData) => ({
        url: '/enquiries',
        method: 'POST',
        body: enquiryData,
      }),
    }),
    sendMessage: builder.mutation({
      query: (messageData) => ({
        url: '/message',
        method: 'POST',
        body: messageData,
      }),
    }),
    getVendorCalendar: builder.query({
      query: ({ vendorId, month, year }) => ({
        url: '/vendor-availabilities/calendar',
        method: 'GET',
        params: {
          vendorId: vendorId,
          month: month,
          year: year,
        },
      }),
    }),
    getSubscriptionPlans: builder.query({
      query: () => ({
        url: '/subscription-plans',
        method: 'GET',
      }),
      providesTags: ['SubscriptionPlan'],
    }),
  }),
});

const {
  useGetVendorProfilesQuery,
  useGetVendorDetailQuery,
  useSendEnquiryMutation,
  useSendMessageMutation,
  useGetVendorCalendarQuery,
  useGetSubscriptionPlansQuery,
  useGetVendorProfilesHomeQuery,
} = coupleDashboardApi;

export {
  useGetVendorProfilesQuery,
  useGetVendorDetailQuery,
  useSendEnquiryMutation,
  useSendMessageMutation,
  useGetVendorCalendarQuery,
  useGetSubscriptionPlansQuery,
  useGetVendorProfilesHomeQuery,
};
