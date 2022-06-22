import axiosClient from "./axiosClient";

export const configAPI = {
  movieGetAll: () => {
    const path = `/api/movies/all`;
    return axiosClient.get(path);
  },
  movieGetWithPagination: (params) => {
    const path = `/api/movies`;
    return axiosClient.get(path, { params });
  },
  movieGetDetail: (movieId) => {
    const path = `/api/movies/${movieId}`;
    return axiosClient.get(path);
  },
  movieGetShowtime: (id) => {
    const path = `/api/movies/${id}/showtimes`;
    return axiosClient.get(path);
  },
  movieAddNew: (data) => {
    const path = `/api/movies`;
    return axiosClient.post(path, data);
  },
  movieUpdate: (id, data) => {
    const path = `/api/movies/${id}`;
    return axiosClient.put(path, data);
  },
  movieDelete: (id) => {
    const path = `/api/movies/${id}`;
    return axiosClient.delete(path);
  },
  cinemaComplexesGet: (params) => {
    const path = `/api/cinema-complexes`;
    return axiosClient.get(path, { params });
  },
  cinemaComplexesGetSingle: (id) => {
    const path = `/api/cinema-complexes/${id}`;
    return axiosClient.get(path);
  },
  cinemasGetAll: (params) => {
    const path = `/api/cinemas/all`;
    return axiosClient.get(path, { params });
  },
  cinemaGetWithPagination: (params) => {
    const path = `/api/cinemas`;
    return axiosClient.get(path, { params });
  },
  cinemasGetSingle: (id) => {
    const path = `/api/cinemas/${id}`;
    return axiosClient.get(path);
  },
  cinemaGetInformation: (id) => {
    const path = `/api/cinemas/${id}`;
    return axiosClient.get(path);
  },
  showtimeGetAll: () => {
    const path = `/api/showtimes/all`;
    return axiosClient.get(path);
  },
  showtimeGetWithPagination: (params) => {
    const path = `api/showtimes`;
    return axiosClient.get(path, { params });
  },
  showtimeGetSingle: (id) => {
    const path = `/api/showtimes/${id}`;
    return axiosClient.get(path);
  },
  showtimeAddNew: (data) => {
    const path = `/api/showtimes`;
    return axiosClient.post(path, data);
  },
  showtimeUpdate: (id, data) => {
    const path = `/api/showtimes/${id}`;
    return axiosClient.put(path, data);
  },
  showtimeDelete: (id) => {
    const path = `/api/showtimes/${id}`;
    return axiosClient.delete(path);
  },
  bookingAddNew: (data) => {
    const path = `/api/bookings`;
    return axiosClient.post(path, data);
  },
  screenGetAll: () => {
    const path = `/api/screens/all`;
    return axiosClient.get(path);
  },
  bookingGetSingle: (id) => {
    const path = `/api/bookings/${id}`;
    return axiosClient.get(path);
  },
  bookingCancel: (id) => {
    const path = `/api/bookings/${id}/cancel-booking`;
    return axiosClient.post(path);
  },
  showtimeGetSingle: (id) => {
    const path = `/api/showtimes/${id}`;
    return axiosClient.get(path);
  },
  showtimeGetByComplexes: () => {
    const path = `/api/cinema-complexes/showtimes`;
    return axiosClient.get(path);
  },
  userGetAll: () => {
    const path = `/api/users/all`;
    return axiosClient.get(path);
  },
  userGetWithPagination: (params) => {
    const path = `/api/users`;
    return axiosClient.get(path, { params });
  },
  userGetSingle: (id) => {
    const path = `/api/users/${id}`;
    return axiosClient.get(path);
  },
  userUpdate: (id, data) => {
    const path = `/api/users/${id}`;
    return axiosClient.put(path, data);
  },
  userSignIn: (user) => {
    const path = `/api/auth/sign-in`;
    return axiosClient.post(path, user);
  },
  userSignUp: (user) => {
    const path = `/api/auth/sign-up`;
    return axiosClient.post(path, user);
  },
  userMyBooking: () => {
    const path = `api/auth/my-bookings`;
    return axiosClient.get(path);
  },
  userMyProfile: () => {
    const path = `/api/auth/my-profile`;
    return axiosClient.get(path);
  },
  userUpdateProfile: (user) => {
    const path = `/api/auth/update-profile`;
    return axiosClient.put(path, user);
  },
  // commentGetAll: () => {
  //   const path = "https://62459f866b7ecf057c216c44.mockapi.io/api/comments";
  //   return axios.get(path);
  // },
  // commentAddNew: (body) => {
  //   const path = `https://62459f866b7ecf057c216c44.mockapi.io/api/comments`;
  //   return axios.post(path, body);
  // },
};
