import axios from "axios";

export const commentsApi = {
  getCommentsApi: () => {
    const path = "https://62459f866b7ecf057c216c44.mockapi.io/api/comments";
    return axios.get(path);
  },

  postCommentApi: (requestComment) => {
    const path = `https://62459f866b7ecf057c216c44.mockapi.io/api/comments`;
    return axios.post(path, requestComment);
  },
};
