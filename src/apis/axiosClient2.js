import axios from "axios";
import LocalStorage from "constants/localStorage";
import queryString from "query-string";

const axiosClient2 = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
const accessToken = localStorage.getItem(LocalStorage.accessToken);
axiosClient2.interceptors.request.use((config) => {
  config.headers.common.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default axiosClient2;
