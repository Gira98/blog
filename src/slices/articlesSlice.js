import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  articles: {},
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticlesList: (state, action) => {
      state.articles = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    updateArticle: (state, action) => {
      state.articles[action.payload.slug] = action.payload;
    },
  },
});

export const {setCurrentPage, updateArticle} = articlesSlice.actions

export default articlesSlice.reducer