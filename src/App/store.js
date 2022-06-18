import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "pages/Booking/booking.slice";
import authenticationReducer from "pages/Authentication/authentication.slice";

export const store = configureStore({
  reducer: { booking: bookingReducer, authentication: authenticationReducer },
});
