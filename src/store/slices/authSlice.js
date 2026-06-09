import { createSlice } from '@reduxjs/toolkit';

const removePersistedAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('tokenType');
  localStorage.removeItem('expiresIn');
  localStorage.removeItem('tokenExpiresAt');
  localStorage.removeItem('user');
};

const decodeJwtPayload = (token) => {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length < 2) return null;

  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
};

const toNumber = (value) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value !== 'string') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const getTokenExpiresAt = ({ accessToken, expiresIn, tokenExpiresAt }) => {
  const persistedExpiry = toNumber(tokenExpiresAt);
  if (persistedExpiry) return persistedExpiry;

  const jwtPayload = decodeJwtPayload(accessToken);
  const jwtExp = toNumber(jwtPayload?.exp);
  if (jwtExp) return jwtExp * 1000;

  const ttlSeconds = toNumber(expiresIn);
  if (ttlSeconds && ttlSeconds > 0) return Date.now() + ttlSeconds * 1000;

  return null;
};

const loadAuthState = () => {
  try {
    const accessToken =
      localStorage.getItem('accessToken') || localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    const tokenType = localStorage.getItem('tokenType') || 'Bearer';
    const expiresIn = localStorage.getItem('expiresIn');
    const tokenExpiresAt = localStorage.getItem('tokenExpiresAt');
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    const resolvedTokenExpiresAt = getTokenExpiresAt({
      accessToken,
      expiresIn,
      tokenExpiresAt,
    });

    const isExpired =
      !!resolvedTokenExpiresAt && Date.now() >= resolvedTokenExpiresAt;

    if (accessToken && isExpired) {
      removePersistedAuth();
    }

    return {
      user: isExpired ? null : user,
      isAuthenticated: !!accessToken && !isExpired,
      token: isExpired ? null : accessToken,
      accessToken: isExpired ? null : accessToken,
      refreshToken: isExpired ? null : refreshToken,
      tokenType,
      expiresIn,
      tokenExpiresAt: isExpired ? null : resolvedTokenExpiresAt,
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
      tokenExpiresAt: null,
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
      const tokenExpiresAt = getTokenExpiresAt({
        accessToken,
        expiresIn: action.payload.expiresIn,
        tokenExpiresAt: action.payload.tokenExpiresAt,
      });
      state.user = action.payload.user;
      state.token = accessToken;
      state.accessToken = accessToken;
      state.refreshToken = action.payload.refreshToken || null;
      state.tokenType = action.payload.tokenType || 'Bearer';
      state.expiresIn = action.payload.expiresIn || null;
      state.tokenExpiresAt = tokenExpiresAt;
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
      state.tokenExpiresAt = null;
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
export const selectTokenExpiresAt = (state) => state.auth.tokenExpiresAt;
