import React from "react";
import "./addComment.scss";

export const AddComment = () => {
  return (
    <div className='addComment'>
      <h3>Thêm nhận xét mới</h3>
      <textarea name='addComment__textarea' className='addComment__textarea'></textarea>
      <button className='btn btn__primary addComment__btn'>Nhận xét</button>
    </div>
  );
};
