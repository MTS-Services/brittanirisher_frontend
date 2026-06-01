import { createSlice } from '@reduxjs/toolkit';

const loadAuthState = () => {
  try {
    const accessToken =
      localStorage.getItem('accessToken') || localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    const tokenType = localStorage.getItem('tokenType') || 'Bearer';
    const expiresIn = localStorage.getItem('expiresIn');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return {
      user,
      isAuthenticated: !!accessToken,
      token: accessToken,
      accessToken,
      refreshToken,
      tokenType,
      expiresIn,
      loading: false,
    };
  } catch {
    return {
      user: null,
      isAuthenticated: false,
      token: null,
      accessToken: null,
      refreshToken: null,
      tokenType: 'Bearer',
      expiresIn: null,
      loading: false,
    };
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthState(),
  reducers: {
    loginSuccess: (state, action) => {
      const accessToken = action.payload.accessToken || action.payload.token;
      state.user = action.payload.user;
      state.token = accessToken;
      state.accessToken = accessToken;
      state.refreshToken = action.payload.refreshToken || null;
      state.tokenType = action.payload.tokenType || 'Bearer';
      state.expiresIn = action.payload.expiresIn || null;
      state.isAuthenticated = true;
      state.loading = false;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.tokenType = 'Bearer';
      state.expiresIn = null;
      state.isAuthenticated = false;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { loginSuccess, logout, setLoading, updateUser } =
  authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;
export const selectAuthUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectToken = (state) => state.auth.token;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectAuthLoading = (state) => state.auth.loading;
