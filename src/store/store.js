import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { articlesApi } from "./articlesApi";
import { authApi } from "./authApi";
import authReducer from "../slices/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  [articlesApi.reducerPath]: articlesApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesApi.middleware, authApi.middleware),
});

export default store;
