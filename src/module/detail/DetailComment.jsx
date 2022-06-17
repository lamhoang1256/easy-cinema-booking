import moment from "moment";
import styled from "styled-components";
import { dataFakeAvatar, yourAvatar } from "constants/dataFakeAvatar";
import Description from "components/text/Description";
import Heading from "components/heading/Heading";

const StyledDetailComment = styled.div`
  .comment {
    margin-top: 20px;
  }
  .comment-item {
    margin-top: 20px;
  }
  .comment-header {
    display: flex;
    gap: 20px;
  }
  .comment-avatar {
    width: 60px;
    height: 60px;
    border-radius: 8px;
  }
  .comment-ago {
    color: #9692c7;
  }
  .comment-desc {
    margin-top: 15px;
  }
  .comment-loading {
    width: 40px;
    height: 40px;
  }
`;

const DetailComment = () => {
  const fakeAvatarUser = () => {
    const length = dataFakeAvatar.length;
    const random = Math.floor(Math.random() * length);
    return dataFakeAvatar[random].url;
  };
  const fakeAvatar = `/assets/images/${fakeAvatarUser()}`;
  const meAvatar = `/assets/images/${yourAvatar.url}`;

  return <StyledDetailComment>DetailComment</StyledDetailComment>;
};

// DATA MẪU
// [
//   {
//     "createdAt": 1648816259,
//     "username": "lamhoang1256",
//     "content": "Phim hay !!!",
//     "rating": 5,
//     "like": 0,
//     "idMovie": 8188,
//     "id": "1"
//   },
//   {
//     "createdAt": 1648816357,
//     "username": "hoanglam1309a",
//     "content": "Tuyệt vời !!!",
//     "rating": 5,
//     "like": 1,
//     "idMovie": 8188,
//     "id": "2"
//   }
// ]

export default DetailComment;
