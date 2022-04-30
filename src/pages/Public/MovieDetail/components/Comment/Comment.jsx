import moment from "moment";
import { useSelector } from "react-redux";
import { dataFakeAvatar, yourAvatar } from "constants/dataFakeAvatar";
import "./comment.scss";

export const Comment = () => {
  const { commentList } = useSelector((state) => state.movieDetail);
  const { userInfo } = useSelector((state) => state.user);

  // tạo avatar giả cho user comment
  const fakeAvatarUser = () => {
    const length = dataFakeAvatar.length;
    const random = Math.floor(Math.random() * length);
    return dataFakeAvatar[random].url;
  };

  return (
    <>
      {commentList && (
        <div className='comment-list'>
          {commentList.length !== 0 ? (
            commentList.map((comment) => (
              <div className='comment-item' key={comment.id}>
                <div className='comment-info'>
                  {/* {commentList.username === userInfo.taiKhoan ? : } */}
                  <img
                    className='comment-avatar'
                    src={`${process.env.REACT_APP_PUBLIC}/assets/images/${fakeAvatarUser()}`}
                    alt='comment-avatar'
                  />
                  <div className='comment-profile'>
                    <h3>{comment.username}</h3>
                    <span>{moment(comment.createdAt).fromNow()}</span> {/* tạo timeago */}
                  </div>
                </div>
                <div className='comment-desc'>{comment.content}</div>
              </div>
            ))
          ) : (
            <p className='text--primary'>Chưa có nhận xét</p>
          )}
        </div>
      )}
    </>
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
