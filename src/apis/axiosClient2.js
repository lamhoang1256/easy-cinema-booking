import axios from "axios";
import queryString from "query-string";

const axiosClient2 = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient2.interceptors.request.use((config) => {
  config.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTY1NTU1OTUyNywiZXhwIjoxNjU1NjQ1OTI3fQ.239ofLc2Twwl7WYe8kCUgA9e70avwCIUI9WbVfTCgsk`;
  return config;
});

export default axiosClient2;
