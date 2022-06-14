import moment from "moment";
import styled from "styled-components";
import { useSelector } from "react-redux";
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
  const { commentList } = useSelector((state) => state.movieDetail);
  const { userInfo } = useSelector((state) => state.user);
  const fakeAvatarUser = () => {
    const length = dataFakeAvatar.length;
    const random = Math.floor(Math.random() * length);
    return dataFakeAvatar[random].url;
  };
  const fakeAvatar = `/assets/images/${fakeAvatarUser()}`;
  const meAvatar = `/assets/images/${yourAvatar.url}`;

  if (commentList?.length === 0) return <Description>Chưa có nhận xét</Description>;
  return (
    <StyledDetailComment>
      {commentList?.map(({ id, username, createdAt, content }) => (
        <div className="comment-item" key={id}>
          <div className="comment-header">
            <img
              src={username === userInfo?.taiKhoan ? meAvatar : fakeAvatar}
              className="comment-avatar"
              alt="avatar"
            />
            <div className="comment-info">
              <Heading>{username}</Heading>
              <span className="comment-ago">{moment(createdAt).fromNow()}</span>
            </div>
          </div>
          <Description className="comment-desc">{content}</Description>
        </div>
      ))}
    </StyledDetailComment>
  );
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
