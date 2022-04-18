import axios from "axios";

export const commentsApi = {
  // lấy danh sách comment
  getComments: () => {
    const path = "https://62459f866b7ecf057c216c44.mockapi.io/api/comments";
    return axios.get(path);
  },
  // đăng nhận xét mới
  postComments: (requestComment) => {
    const path = `https://62459f866b7ecf057c216c44.mockapi.io/api/comments`;
    return axios.post(path, requestComment);
  },
};
