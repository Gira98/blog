import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://blog-platform.kata.academy/api`,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");

      const token = getState().auth?.token || localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user ,
      }),
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: "/user",
        method: "PUT",
        body: user,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => "/user",
    }),
  }),
});

export const {
  useLazyGetCurrentUserQuery,
  useGetCurrentUserQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useUpdateUserMutation,
} = authApi;
