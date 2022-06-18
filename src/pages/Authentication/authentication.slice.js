import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersApi } from "apis/usersApi";
import LocalStorage from "constants/localStorage";

const initialState = {
  currentUser: [],
  error: "",
};

export const signIn = createAsyncThunk(
  "authentication/signIn",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await usersApi.userSignIn(user);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const signUp = createAsyncThunk("authentication/signUp", async (user) => {
  const { data } = await usersApi.userSignUp(user);
  return data;
});

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, handleAuthFulfilled)
      .addCase(signUp.rejected, handleAuthRejected)
      .addCase(signIn.fulfilled, handleAuthFulfilled)
      .addCase(signIn.rejected, handleAuthRejected);
  },
});

export default authenticationSlice.reducer;
