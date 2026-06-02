import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '../config';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_CONFIG.BASE_URL}/api/v1`,
    // credentials: 'omit',
    prepareHeaders: async (headers) => {
      const token =
        localStorage.getItem('accessToken') || localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['User', 'vendor', 'product', 'order', 'CoupleExpense', 'Dashboard'],
  endpoints: (builder) => ({}),
});

export const { useGetUserQuery } = apiSlice;
