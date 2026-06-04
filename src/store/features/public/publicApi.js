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
  }),
});

const { useGetVendorProfilesQuery,useGetVendorDetailQuery,useSendEnquiryMutation } = coupleDashboardApi;

export { useGetVendorProfilesQuery,useGetVendorDetailQuery,useSendEnquiryMutation };
