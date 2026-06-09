import { apiSlice } from "../../apiSlice";

const CoupledashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoupleDashboard: builder.query({
      query: () => ({
        url: `/couple-profiles/dashboard`,
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    // ✅ Single, correct definition of getVendorSuggested
    getVendorSuggested: builder.query({
      query: (params = {}) => {
        const resolvedParams = typeof params === "number" ? { page: params } : params;

        const {
          page = 1,
          limit = 10,
          sortBy,
          sortOrder,
          search,
          availableDate,
          minPrice,
          maxPrice,
          category,
          state,
          city,
        } = resolvedParams;

        const queryObj = {
          page: String(page),
          limit: String(limit),
        };

        if (sortBy)                                       queryObj.sortBy = sortBy;
        if (sortOrder)                                    queryObj.sortOrder = sortOrder;
        if (search?.trim())                               queryObj.search = search.trim();
        if (availableDate)                                queryObj.availableDate = availableDate;
        if (minPrice !== undefined && minPrice !== "")    queryObj.minPrice = String(minPrice);
        if (maxPrice !== undefined && maxPrice !== "")    queryObj.maxPrice = String(maxPrice);
        if (category)                                     queryObj.category = category;
        if (state)                                        queryObj.state = state;
        if (city)                                         queryObj.city = city;

        const queryString = new URLSearchParams(queryObj).toString();

        return {
          url: `vendor-profiles/couple?${queryString}`,
          method: "GET",
        };
      },
      serializeQueryArgs: ({ queryArgs }) => {
        const resolved = typeof queryArgs === "number" ? { page: queryArgs } : queryArgs;
        return JSON.stringify(resolved);
      },
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
        method: "GET",
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
      providesTags: ["CoupleExpense"],
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
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "CoupleExpense", id }],
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
        method: "POST",
        body,
      }),
      invalidatesTags: ["CoupleExpense", "Dashboard"],
    }),

    updateCoupleProfile: builder.mutation({
      query: (body) => ({
        url: `/couple-profiles/update`,
        method: "PATCH",
        body,
      }),
    }),

    getCoupleChecklist: builder.query({
      query: () => ({
        url: "/couple-checklist",
        method: "GET",
      }),
      providesTags: ["Checklist"],
      transformResponse: (response) => response?.data || [],
    }),

    updateTaskStatus: builder.mutation({
      query: ({ taskId, isCompleted }) => ({
        url: `/couple-checklist/task-status/${taskId}`,
        method: "PATCH",
        body: { isCompleted },
      }),
      async onQueryStarted({ taskId, isCompleted }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          CoupledashboardApi.util.updateQueryData("getCoupleChecklist", undefined, (draft) => {
            for (const section of draft) {
              const task = section.tasks?.find((t) => t.id === taskId);
              if (task) {
                task.isCompleted = isCompleted;
                break;
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    createCoupleChecklist: builder.mutation({
      query: (body) => ({
        url: "/couple-checklist",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Checklist"],
    }),

    updateCoupleChecklist: builder.mutation({
      query: ({ taskSectionId, body }) => ({
        url: `/couple-checklist/${taskSectionId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Checklist"],
    }),

    getCoupleTimeline: builder.query({
      query: () => ({
        url: `/couple-timeline`,
        method: "GET",
      }),
      providesTags: ["Timeline"],
      transformResponse: (response) => {
        return response?.data?.sections || response?.data || response || [];
      },
    }),

    updateTimelineTaskStatus: builder.mutation({
      query: ({ taskId, isCompleted }) => ({
        url: `/couple-timeline/task-status/${taskId}`,
        method: "PATCH",
        body: { isCompleted },
      }),
      async onQueryStarted({ taskId, isCompleted }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          CoupledashboardApi.util.updateQueryData("getCoupleTimeline", undefined, (draft) => {
            if (Array.isArray(draft)) {
              for (const section of draft) {
                const task = section.tasks?.find((t) => t.id === taskId);
                if (task) {
                  task.isCompleted = isCompleted;
                  break;
                }
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    updateTimelineSectionNote: builder.mutation({
      query: ({ timelineSectionId, note }) => ({
        url: `/couple-timeline/${timelineSectionId}`,
        method: "PATCH",
        body: { note },
      }),
      async onQueryStarted({ timelineSectionId, note }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          CoupledashboardApi.util.updateQueryData("getCoupleTimeline", undefined, (draft) => {
            if (Array.isArray(draft)) {
              const section = draft.find((s) => s.id === timelineSectionId);
              if (section) {
                section.note = note;
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    createTimelineTask: builder.mutation({
      query: (body) => ({
        url: "/couple-timeline",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Timeline"],
    }),

    getCoupleSchedule: builder.query({
      query: () => ({
        url: `/couple-day-schedule`,
        method: "GET",
      }),
      providesTags: ["Schedule"],
      transformResponse: (response) => {
        return response?.data || [];
      },
    }),

    createCoupleSchedule: builder.mutation({
      query: (body) => ({
        url: `/couple-day-schedule`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Schedule"],
    }),

    updateCoupleSchedule: builder.mutation({
      query: ({ id, body }) => ({
        url: `/couple-day-schedule/${id}`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          CoupledashboardApi.util.updateQueryData("getCoupleSchedule", undefined, (draft) => {
            const item = draft.find((s) => s.id === id);
            if (item) Object.assign(item, body);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    deleteCoupleSchedule: builder.mutation({
      query: (id) => ({
        url: `/couple-day-schedule/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          CoupledashboardApi.util.updateQueryData("getCoupleSchedule", undefined, (draft) => {
            const index = draft.findIndex((s) => s.id === id);
            if (index !== -1) draft.splice(index, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    getSaveVendors: builder.query({
  query: (params = {}) => {
    const { page = 1, limit = 10 } = params;
    return {
      url: `/save-vendor?page=${page}&limit=${limit}`,
      method: "GET",
    };
  },
  providesTags: ["SaveVendor"], 
}),

    saveVendor: builder.mutation({
      query: (body) => ({
        url: `/save-vendor`,
        method: "POST",
        body, 
      }),
      invalidatesTags: ["SaveVendor"],
      
      async onQueryStarted({ vendorId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            CoupledashboardApi.util.updateQueryData(
              "getVendorSuggested",
              undefined, 
              (draft) => {
                const vendorList = draft?.data?.vendors || draft?.vendors || draft;
                if (Array.isArray(vendorList)) {
                  const vendor = vendorList.find((v) => v.id === vendorId);
                  if (vendor) {
                    vendor.isSaved = !vendor.isSaved;
                  }
                }
              }
            )
          );
        } catch {
        }
      },
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
  useGetCoupleChecklistQuery,
  useUpdateTaskStatusMutation,
  useCreateCoupleChecklistMutation,
  useUpdateCoupleChecklistMutation,
  useGetCoupleTimelineQuery,
  useUpdateTimelineTaskStatusMutation,
  useUpdateTimelineSectionNoteMutation,
  useCreateTimelineTaskMutation,
  useGetCoupleScheduleQuery,
  useCreateCoupleScheduleMutation,
  useUpdateCoupleScheduleMutation,
  useDeleteCoupleScheduleMutation,
  useGetSaveVendorsQuery,
  useSaveVendorMutation,
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
  useGetCoupleChecklistQuery,
  useUpdateTaskStatusMutation,
  useCreateCoupleChecklistMutation,
  useUpdateCoupleChecklistMutation,
  useGetCoupleTimelineQuery,
  useUpdateTimelineTaskStatusMutation,
  useUpdateTimelineSectionNoteMutation,
  useCreateTimelineTaskMutation,
  useGetCoupleScheduleQuery,
  useCreateCoupleScheduleMutation,
  useUpdateCoupleScheduleMutation,
  useDeleteCoupleScheduleMutation,
  useGetSaveVendorsQuery,
  useSaveVendorMutation,
};