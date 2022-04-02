import React, { useState } from "react";
import "./addComment.scss";

export const AddComment = () => {
  const [newComment, setNewComment] = useState("");
  console.log(newComment);
  // xử lí thêm mới nhận xét
  const handleAddNewComment = () => {
    if (newComment.length < 40) {
      console.log("Chưa đủ 40 kí tự");
    } else {
      console.log(newComment);
      // setNewComment("");
    }
  };

  return (
    <div className='addComment'>
      <h3>Thêm nhận xét mới</h3>
      <textarea
        name='addComment__textarea'
        className='addComment__textarea'
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>
      <button className='btn btn__primary addComment__btn' onClick={handleAddNewComment}>
        Nhận xét
      </button>
    </div>
  );
};
