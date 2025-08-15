import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articlesApi = createApi({
  reducerPath: "articlesApi",
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
  tagTypes: ["Articles"],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ page, limit }) => {
        const offset = (page - 1) * limit;

        return `/articles?limit=${limit}&offset=${offset}`;
      },
      providesTags: ["Articles"],
    }),
    getArticleBySlug: builder.query({
      query: (slug) => `/articles/${slug}`,
      providesTags: (_, __, slug) => [{ type: "Articles", id: slug }],
    }),
    createArticle: builder.mutation({
      query: (article) => ({
        url: "/articles",
        method: "POST",
        body: article,
      }),
      invalidatesTags: ["Articles"],
    }),
    editArticle: builder.mutation({
      query: ({ slug, article }) => ({
        url: `/articles/${slug}`,
        method: "PUT",
        body: article,
      }),
      invalidatesTags: ["Articles"],
    }),
    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Articles"],
    }),
    favoriteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: "POST",
      }),
      invalidatesTags: (_, __, slug) => [
        { type: "Articles", id: slug },
        "Articles",
      ],
    }),
    unfavoriteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, slug) => [
        { type: "Articles", id: slug },
        "Articles",
      ],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleBySlugQuery,
  useCreateArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} = articlesApi;
