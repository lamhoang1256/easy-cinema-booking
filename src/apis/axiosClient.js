import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    TokenCybersoft: process.env.REACT_APP_TOKEN_CYBERSOFT,
  },
});

axiosClient.interceptors.request.use((config) => {
  //tất cả request đều phải qua đây
  const user = localStorage.getItem("userInfo");
  if (user) {
    // nếu có đăng nhập thì thực hiện
    const { accessToken } = JSON.parse(user);
    config.headers.common.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosClient;
