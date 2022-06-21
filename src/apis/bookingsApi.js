import axiosClient2 from "./axiosClient2";

export const bookingsApi = {
  bookingGetSingle: (id) => {
    const path = `/api/bookings/${id}`;
    return axiosClient2.get(path);
  },
  bookingCancel: (id) => {
    const path = `/api/bookings/${id}/cancel-booking`;
    return axiosClient2.post(path);
  },
};
