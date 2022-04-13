import React from "react";
import moment from "moment";
import "./comment.scss";

export const Comment = ({ dataComment }) => {
  return (
    <>
      {dataComment.length !== 0
        ? dataComment.map((comment) => (
            <div className='comment-item' key={comment.id}>
              <div className='comment-info'>
                <img
                  className='comment-avatar'
                  src={`${process.env.REACT_APP_PUBLIC}/assets/images/avatar/user-avatar-1.jpg`}
                  alt='comment-avatar'
                />
                <div className='comment-profile'>
                  <h3>{comment.username}</h3>
                  {/* tạo timeago */}
                  <span>{moment(moment.unix(1648816259).format()).fromNow()}</span>
                </div>
              </div>
              <div className='comment-desc'>{comment.content}</div>
            </div>
          ))
        : "Chưa có nhận xét"}
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
