import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { moviesApi } from "apis/moviesApi";

const initialState = {
  showtime: [],
  loading: true,
};

export const fetchShowtime = createAsyncThunk("booking/fetchShowtime", async (id) => {
  const { data } = await moviesApi.showtimeGetSingle(id);
  return data.data.showtime;
});

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowtime.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShowtime.fulfilled, (state, action) => {
        state.loading = false;
        state.showtime = action.payload;
      });
  },
});

// export const {} = bookingSlice.actions;

export default bookingSlice.reducer;
