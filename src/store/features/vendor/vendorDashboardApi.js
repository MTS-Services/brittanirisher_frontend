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
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Enquiries", "EnquiryDetails"],
    }),

    deleteEnquiry: builder.mutation({
      query: (id) => ({
        url: `/enquiries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Enquiries"],
    }),
    getVendorCalendar: builder.query({
      query: ({ vendorId, year, month }) => ({
        url: `/vendor-availabilities/calendar`,
        method: "GET",
        params: { vendorId, year, month },
      }),
      providesTags: ["Calendar"],
    }),

    saveBulkMonthAvailability: builder.mutation({
      query: (body) => ({
        url: `/vendor-availabilities/bulk/month`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Calendar"],
    }),
    updateVendorProfile: builder.mutation({
      query: (formData) => ({
        url: `/vendor-profiles/update`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["VendorProfile"],
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
  useGetEnquiriesQuery,
  useGetEnquiryByIdQuery,
  useUpdateEnquiryStatusMutation,
  useDeleteEnquiryMutation,
  useGetVendorCalendarQuery,
  useSaveBulkMonthAvailabilityMutation,
  useUpdateVendorProfileMutation,
  useDeletePortfolioImageMutation,
  useCreateVendorPackageMutation,
  useGetVendorPackageByIdQuery,
  useUpdateVendorPackageMutation,
  useDeleteVendorPackageMutation 
} = vendordashboardApi;

export {
  useGetVendorStatusQuery,
  useGetVendodasrhboarStatusQuery,
  useGetVendorChartDataQuery,
  useGetEnquiriesQuery,
  useGetEnquiryByIdQuery,
  useUpdateEnquiryStatusMutation,
  useDeleteEnquiryMutation,
  useGetVendorCalendarQuery,
  useSaveBulkMonthAvailabilityMutation,
  useUpdateVendorProfileMutation,
  useDeletePortfolioImageMutation,
  useCreateVendorPackageMutation,
  useGetVendorPackageByIdQuery,
  useUpdateVendorPackageMutation,
  useDeleteVendorPackageMutation 
};
