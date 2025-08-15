import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

try {
  const savedUser = localStorage.getItem("user");
  const savedToken = localStorage.getItem("token");

  if (savedUser) initialState.user = JSON.parse(savedUser);
  if (savedToken) initialState.token = savedToken;
} catch (e) {
  console.warn("Failed to parse token", e);
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user || null;
export const selectCurrentToken = (state) => state.auth.token || null;
