import { apiSlice } from "../../apiSlice";

const vendordashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVendorStatus: builder.query({
      query: () => ({
        url: `/vendor-profiles/my/profile`,
        method: "GET",
      }),
    }),

    getVendodasrhboarStatus: builder.query({
      query: () => ({
        url: `/dashboard/vendor-data`,
        method: "GET",
      }),
    }),

    getVendorChartData: builder.query({
      query: () => ({
        url: `/dashboard/vendor-chart`,
        method: "GET",
      }),
    }),

    getEnquiries: builder.query({
      query: (page = 1) => ({
        url: `/enquiries?page=${page}`,
        method: "GET",
      }),
    }),
    getEnquiryById: builder.query({
      query: (id) => ({
        url: `/enquiries/${id}`,
        method: "GET",
      }),
    }),
    updateEnquiryStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/enquiries/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Enquiries', 'EnquiryDetails'], 
    }),

    deleteEnquiry: builder.mutation({
      query: (id) => ({
        url: `/enquiries/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Enquiries'],
    }),
  getVendorCalendar: builder.query({
      query: ({ vendorId, year, month }) => ({
        url: `/vendor-availabilities/calendar`,
        method: 'GET',
        params: { vendorId, year, month },
      }),
      providesTags: ['Calendar'],
    }),

    saveBulkMonthAvailability: builder.mutation({
      query: (body) => ({
        url: `/vendor-availabilities/bulk/month`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Calendar'], 
    }),
  }),
});
const {
  useGetVendorStatusQuery,
  useGetVendodasrhboarStatusQuery,
  useGetVendorChartDataQuery,
  useGetEnquiriesQuery,
  useGetEnquiryByIdQuery,
  useUpdateEnquiryStatusMutation, 
  useDeleteEnquiryMutation,
  useGetVendorCalendarQuery, useSaveBulkMonthAvailabilityMutation       
} = vendordashboardApi;

export {
  useGetVendorStatusQuery,
  useGetVendodasrhboarStatusQuery,
  useGetVendorChartDataQuery,
  useGetEnquiriesQuery,
  useGetEnquiryByIdQuery,
  useUpdateEnquiryStatusMutation, 
  useDeleteEnquiryMutation,
  useGetVendorCalendarQuery, useSaveBulkMonthAvailabilityMutation 
};
