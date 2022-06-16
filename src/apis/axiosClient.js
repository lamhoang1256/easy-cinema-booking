import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    TokenCybersoft: process.env.REACT_APP_TOKEN_CYBERSOFT,
  },
});

axiosClient.interceptors.request.use((config) => {
  const user = localStorage.getItem("userInfo");
  if (user) {
    const { accessToken } = JSON.parse(user);
    config.headers.common.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosClient;
// export default axiosClient2;
