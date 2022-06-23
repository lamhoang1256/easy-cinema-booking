import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { configAPI } from "apis/configAPI";
import LocalStorage from "constants/localStorage";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem(LocalStorage.currentUser)) || null,
  error: "",
};

export const signIn = createAsyncThunk(
  "authentication/signIn",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await configAPI.userSignIn(user);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const signUp = createAsyncThunk("authentication/signUp", async (user) => {
  const { data } = await configAPI.userSignUp(user);
  return data;
});
const handleUnauth = (state) => {
  state.currentUser = {};
  localStorage.removeItem(LocalStorage.currentUser);
  localStorage.removeItem(LocalStorage.accessToken);
};

const handleAuthFulfilled = (state, action) => {
  const { user, accessToken } = action.payload.data;
  state.currentUser = { user, accessToken };
  localStorage.setItem(LocalStorage.currentUser, JSON.stringify(user));
  localStorage.setItem(LocalStorage.accessToken, accessToken);
};
const handleAuthRejected = (state, action) => {
  state.error = action.payload.message;
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout: handleUnauth,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, handleAuthFulfilled)
      .addCase(signUp.rejected, handleAuthRejected)
      .addCase(signIn.fulfilled, handleAuthFulfilled)
      .addCase(signIn.rejected, handleAuthRejected);
  },
});

export const { logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
