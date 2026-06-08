import { apiSlice } from '../../apiSlice';

const toFormData = (payload) => {
  if (payload instanceof FormData) {
    return payload;
  }

  const formData = new FormData();
  if (!payload || typeof payload !== 'object') {
    return formData;
  }

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item instanceof File || item instanceof Blob) {
          formData.append(key, item);
        } else {
          formData.append(key, typeof item === 'string' ? item : JSON.stringify(item));
        }
      });
      return;
    }

    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
      return;
    }

    formData.append(key, typeof value === 'string' ? value : JSON.stringify(value));
  });

  return formData;
};

const vendorSignupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createVendorProfile: builder.mutation({
      query: (payload) => ({
        url: '/vendor-profiles',
        method: 'POST',
        body: toFormData(payload),
      }),
    }),
  }),
});

export const { useCreateVendorProfileMutation } = vendorSignupApi;
