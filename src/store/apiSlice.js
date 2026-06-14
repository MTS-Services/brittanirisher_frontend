import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '../config';
import { logout } from './slices/authSlice';

const baseQuery = fetchBaseQuery({
  // baseUrl: `${API_CONFIG.BASE_URL}/api/v1`,
    baseUrl: `http://localhost:3000/api/v1`,
  // credentials: 'omit',
  prepareHeaders: async (headers) => {
    const token =
      localStorage.getItem('accessToken') || localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithAuthGuard = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  const isUnauthorized = result?.error?.status === 401;
  const hasActiveSession = api.getState().auth?.isAuthenticated;

  if (isUnauthorized && hasActiveSession) {
    api.dispatch(logout());
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuthGuard,
  tagTypes: [
       'User',
    'vendor',
    'product',
    'order',
    'CoupleExpense',
    'Dashboard',
    'Checklist',
    'Timeline',
    'Schedule',
    'SaveVendor',      
    'VendorProfile',,
    'VendorPackages',
    'Enquiries',
    'EnquiryDetails',
    'Calendar',
    'Category',
    'WeddingStyle',
    'Message',
    'SubscriptionPlan',
    'Bookings',
    'BookingDetails',
    'VendorProfile',
    'Enquiries',
  ],
  endpoints: (builder) => ({}),
});

export const { useGetUserQuery } = apiSlice;
