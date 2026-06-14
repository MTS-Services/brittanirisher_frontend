import { apiSlice } from '../../apiSlice';

const vendordashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVendorStatus: builder.query({
      query: () => ({
        url: `/vendor-profiles/my/profile`,
        method: 'GET',
      }),
      providesTags: ['VendorProfile'],
    }),

    getVendodasrhboarStatus: builder.query({
      query: () => ({
        url: `/dashboard/vendor-data`,
        method: 'GET',
      }),
    }),

    getVendorChartData: builder.query({
      query: () => ({
        url: `/dashboard/vendor-chart`,
        method: 'GET',
      }),
    }),
    getVendorPackages: builder.query({
      query: () => ({
        url: `/vendor-package`,
        method: 'GET',
      }),
      providesTags: ['VendorPackages'],
    }),
    getBookings: builder.query({
      query: ({ page = 1, limit = 10, status } = {}) => ({
        url: `/bookings`,
        method: 'GET',
        params: {
          page,
          limit,
          ...(status ? { status } : {}),
        },
      }),
      providesTags: (result) => {
        const bookings = result?.data || [];
        return [
          'Bookings',
          ...bookings.map((booking) => ({
            type: 'BookingDetails',
            id: booking.id,
          })),
        ];
      },
    }),
    createBooking: builder.mutation({
      query: (body) => ({
        url: `/bookings`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Bookings'],
    }),
    getBookingById: builder.query({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'BookingDetails', id }],
    }),
    updateBooking: builder.mutation({
      query: ({ id, body }) => ({
        url: `/bookings/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        'Bookings',
        { type: 'BookingDetails', id },
      ],
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        'Bookings',
        { type: 'BookingDetails', id },
      ],
    }),

    getEnquiries: builder.query({
      query: (page = 1) => ({
        url: `/enquiries?page=${page}`,
        method: 'GET',
      }),
      providesTags: ['Enquiries'],
    }),
    getEnquiryById: builder.query({
      query: (id) => ({
        url: `/enquiries/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'EnquiryDetails', id }],
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
    updateVendorProfile: builder.mutation({
      query: (formData) => ({
        url: `/vendor-profiles/update`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['VendorProfile'],
    }),
    updateSubscription: builder.mutation({
      query: ({ planId }) => ({
        url: `/vendor-profiles/update-subscription`,
        method: 'POST',
        body: { planId },
      }),
      invalidatesTags: ['VendorProfile'],
    }),
    deletePortfolioImage: builder.mutation({
      query: (imageId) => ({
        url: `/vendor-profiles/portfolio/${imageId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['VendorProfile'],
    }),
    getVendorPackageById: builder.query({
      query: (id) => ({
        url: `/vendor-package/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'VendorPackages', id }],
    }),

    createVendorPackage: builder.mutation({
      query: (body) => ({
        url: `/vendor-package`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['VendorPackages'],
    }),

    updateVendorPackage: builder.mutation({
      query: ({ id, body }) => ({
        url: `/vendor-package/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'VendorPackages', id },
        'VendorPackages',
      ],
    }),
    deleteVendorPackage: builder.mutation({
      query: (id) => ({
        url: `/vendor-package/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'VendorPackages', id },
        'VendorPackages',
      ],
    }),
  }),
});
const {
  useGetVendorStatusQuery,
  useGetVendodasrhboarStatusQuery,
  useGetVendorChartDataQuery,
  useGetVendorPackagesQuery,
  useGetBookingsQuery,
  useCreateBookingMutation,
  useLazyGetBookingByIdQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useGetEnquiriesQuery,
  useGetEnquiryByIdQuery,
  useUpdateEnquiryStatusMutation,
  useDeleteEnquiryMutation,
  useGetVendorCalendarQuery,
  useSaveBulkMonthAvailabilityMutation,
  useUpdateVendorProfileMutation,
  useUpdateSubscriptionMutation,
  useDeletePortfolioImageMutation,
  useCreateVendorPackageMutation,
  useGetVendorPackageByIdQuery,
  useUpdateVendorPackageMutation,
  useDeleteVendorPackageMutation,
} = vendordashboardApi;

export {
  useGetVendorStatusQuery,
  useGetVendodasrhboarStatusQuery,
  useGetVendorChartDataQuery,
  useGetVendorPackagesQuery,
  useGetBookingsQuery,
  useCreateBookingMutation,
  useLazyGetBookingByIdQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useGetEnquiriesQuery,
  useGetEnquiryByIdQuery,
  useUpdateEnquiryStatusMutation,
  useDeleteEnquiryMutation,
  useGetVendorCalendarQuery,
  useSaveBulkMonthAvailabilityMutation,
  useUpdateVendorProfileMutation,
  useUpdateSubscriptionMutation,
  useDeletePortfolioImageMutation,
  useCreateVendorPackageMutation,
  useGetVendorPackageByIdQuery,
  useUpdateVendorPackageMutation,
  useDeleteVendorPackageMutation,
};
