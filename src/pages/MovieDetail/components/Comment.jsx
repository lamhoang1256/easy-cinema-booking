import React from "react";
import "./comment.scss";

export const Comment = ({ dataComment }) => {
  console.log(dataComment);
  return (
    <>
      {dataComment.length !== 0
        ? dataComment.map((comment) => (
            <div className='comment__item' key={comment.id}>
              <div className='comment__info'>
                <img
                  className='comment__avatar'
                  src={`${process.env.REACT_APP_PUBLIC}/assets/user-avatar-1.jpg`}
                  alt='comment-avatar'
                />
                <div className='comment__profile'>
                  <h3>{comment.username}</h3>
                  <span>{new Date(comment.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <div className='comment__desc'>{comment.content}</div>
            </div>
          ))
        : "Chưa có nhận xét"}
    </>
  );
};
