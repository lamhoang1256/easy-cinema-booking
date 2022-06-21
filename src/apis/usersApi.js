import axiosClient2 from "./axiosClient2";

export const usersApi = {
  userGetAll: () => {
    const path = `/api/users/all`;
    return axiosClient2.get(path);
  },
  userGetWithPagination: (params) => {
    const path = `/api/users`;
    return axiosClient2.get(path, { params });
  },
  userGetSingle: (id) => {
    const path = `/api/users/${id}`;
    return axiosClient2.get(path);
  },
  userUpdate: (id, data) => {
    const path = `/api/users/${id}`;
    return axiosClient2.put(path, data);
  },
  userSignIn: (user) => {
    const path = `/api/auth/sign-in`;
    return axiosClient2.post(path, user);
  },
  userSignUp: (user) => {
    const path = `/api/auth/sign-up`;
    return axiosClient2.post(path, user);
  },
  userMyBooking: () => {
    const path = `api/auth/my-bookings`;
    return axiosClient2.get(path);
  },
  userMyProfile: () => {
    const path = `/api/auth/my-profile`;
    return axiosClient2.get(path);
  },
  userUpdateProfile: (user) => {
    const path = `/api/auth/update-profile`;
    return axiosClient2.put(path, user);
  },
};
