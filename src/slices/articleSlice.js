// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const initialState = {
//   articleData: {},
//   errorCode: null,
//   errorMessage: null,
// }


// export const fetchArticles = createAsyncThunk('article/fetchArticles', async function () {
//   const url = `https://blog-platform.kata.academy/api`;
//   const response = await fetch(`${url}/articles`);

//   if (!response.ok) {
//     throw new Error(
//       `Error while fetching articles: ${response.status} ${response.statusText}`
//     );
//   }

//   const data = await response.json();
//   return data;
// })



// const articleSlice = createSlice({
//   name: 'article',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.errorCode = null
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchArticles.fulfilled, (state, action) => {
//         console.log('Зафетчили статьи - ', action.payload)

//         if (action.payload) {
//           state.articleData = action.payload.articles
//         }
//       })
//       .addCase(fetchArticles.rejected, (state, action) => {
//         console.log('Fetching faiiled - ', action.payload)
//         const { message } = action.payload.message.errors.error
//         const { status } = action.payload
//         if (action.payload) {
//           state.errorCode = status
//           state.errorMessage = message
//         }
//       })
// }})



// export default articleSlice.reducer