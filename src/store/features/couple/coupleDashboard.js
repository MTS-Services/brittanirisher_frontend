import { apiSlice } from "../../apiSlice";

const CoupledashboardApi = apiSlice.injectEndpoints({
  // tagTypes: ['CoupleExpense'], 

  endpoints: (builder) => ({
    getCoupleDashboard: builder.query({
      query: () => ({
        url: `/couple-profiles/dashboard`,
        method: "GET",
      }),
      providesTags : ['Dashboard'],
    }),

    getVendorSuggested: builder.query({
      query: (page = 1) => ({
        url: `vendor-profiles/couple?page=${page}&limit=10`,
        method: "GET",
      }),
    }),

    getCoupleProfile: builder.query({
      query: () => ({
        url: `/couple-profiles/my`,
        method: "GET",
      }),
    }),
    getStates: builder.query({
      query: () => ({
        url: `/state`,
        method: "GET",
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: `/categories`,
        method: 'GET',
      }),
      transformResponse: (response) => {
        const categoryList =
          response?.data?.categories ||
          response?.data?.data?.categories ||
          response?.categories ||
          response?.data ||
          response;

        return Array.isArray(categoryList) ? categoryList : [];
      },
    }),
    getCoupleExpense: builder.query({
      query: () => ({
        url: `/couple-expense`,
        method: "GET",
      }),
      providesTags: ['CoupleExpense'],
      transformResponse: (response) => {
        const expenseList =
          response?.data?.expenses ||
          response?.data?.data?.expenses ||
          response?.expenses ||
          response?.data ||
          response;

        return Array.isArray(expenseList) ? expenseList : [];
      },
    }),

    getCoupleExpenseById: builder.query({
      query: (id) => ({
        url: `/couple-expense/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'CoupleExpense', id }],
      transformResponse: (response) => {
        return (
          response?.data?.expense ||
          response?.data?.data?.expense ||
          response?.data?.data ||
          response?.expense ||
          response?.data ||
          response
        );
      },
      
    }),

    createCoupleExpense: builder.mutation({
      query: (body) => ({
        url: `/couple-expense`,
        method: 'POST',
        body,
      }),
     invalidatesTags: ['CoupleExpense', 'Dashboard'],
    }),

    updateCoupleProfile: builder.mutation({
      query: (body) => ({
        url: `/couple-profiles/update`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

const {
  useGetCoupleDashboardQuery,
  useGetVendorSuggestedQuery,
  useGetCoupleProfileQuery,
  useGetStatesQuery,
  useGetCategoriesQuery,
  useGetCoupleExpenseQuery,
  useGetCoupleExpenseByIdQuery,
  useCreateCoupleExpenseMutation,
  useUpdateCoupleProfileMutation,
} = CoupledashboardApi;

export {
  useGetCoupleDashboardQuery,
  useGetVendorSuggestedQuery,
  useGetCoupleProfileQuery,
  useGetStatesQuery,
  useGetCategoriesQuery,
  useGetCoupleExpenseQuery,
  useGetCoupleExpenseByIdQuery,
  useCreateCoupleExpenseMutation,
  useUpdateCoupleProfileMutation,
};
