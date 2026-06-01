import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import authReducer, {
  loginSuccess,
  logout,
  updateUser,
} from './slices/authSlice';
import themeReducer, {
  toggleTheme,
  setTheme,
  setPrimaryColor,
} from './slices/themeSlice';
import cartReducer from './slices/cartSlice';
import { apiSlice } from './apiSlice';

const applyPrimaryColor = (color) => {
  document.documentElement.style.setProperty('--color-primary', color);
};

const listener = createListenerMiddleware();

// Auth persistence
listener.startListening({
  actionCreator: loginSuccess,
  effect: (action) => {
    const accessToken = action.payload.accessToken || action.payload.token;
    localStorage.setItem('token', accessToken);
    localStorage.setItem('accessToken', accessToken);
    if (action.payload.refreshToken) {
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    } else {
      localStorage.removeItem('refreshToken');
    }
    if (action.payload.tokenType) {
      localStorage.setItem('tokenType', action.payload.tokenType);
    } else {
      localStorage.removeItem('tokenType');
    }
    if (action.payload.expiresIn) {
      localStorage.setItem('expiresIn', action.payload.expiresIn);
    } else {
      localStorage.removeItem('expiresIn');
    }
    localStorage.setItem('user', JSON.stringify(action.payload.user));
  },
});

listener.startListening({
  actionCreator: logout,
  effect: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('user');
  },
});

listener.startListening({
  actionCreator: updateUser,
  effect: (action, api) => {
    localStorage.setItem('user', JSON.stringify(api.getState().auth.user));
  },
});

// Theme persistence + DOM sync
listener.startListening({
  actionCreator: toggleTheme,
  effect: (action, api) => {
    const { mode } = api.getState().theme;
    localStorage.setItem('theme', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  },
});

listener.startListening({
  actionCreator: setTheme,
  effect: (action) => {
    const mode = action.payload;
    localStorage.setItem('theme', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  },
});

// Primary color CSS variable sync
listener.startListening({
  actionCreator: setPrimaryColor,
  effect: (action) => {
    applyPrimaryColor(action.payload);
  },
});

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listener.middleware)
      .concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Apply initial primary color on store creation
applyPrimaryColor(store.getState().theme.primaryColor);

export default store;
