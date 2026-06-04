import { apiSlice } from "../../apiSlice";
export const coupleDashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVendorProfiles: builder.query({
      query: (params) => ({
        url: "/vendor-profiles",
        method: "GET",
        params: params,
      }),
    }),
    getVendorDetail: builder.query({
      query: (id) => ({
        url: `/vendor-profiles/${id}`,
        method: "GET",
      }),
    }),
    sendEnquiry: builder.mutation({
      query: (enquiryData) => ({
        url: "/enquiries",
        method: "POST",
        body: enquiryData,
      }),
    }),
    getVendorCalendar: builder.query({
      query: ({ vendorId, month, year }) => ({
        url: "/vendor-availabilities/calendar",
        method: "GET",
        params: { vendorId, month, year },
      }),
    }),
  }),
});

const { useGetVendorProfilesQuery,useGetVendorDetailQuery,useSendEnquiryMutation,useGetVendorCalendarQuery } = coupleDashboardApi;

export { useGetVendorProfilesQuery,useGetVendorDetailQuery,useSendEnquiryMutation,useGetVendorCalendarQuery };
