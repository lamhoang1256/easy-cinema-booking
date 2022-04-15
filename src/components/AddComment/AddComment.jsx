import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postCommentAction, getCommentMovieAction } from "redux/actions/movieDetail.action";
import Swal from "sweetalert2";
import "./addComment.scss";

export const AddComment = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // lấy id từ thanh url
  const { userInfo } = useSelector((state) => state.user);
  const { dataComment } = useSelector((state) => state.movieDetail);
  console.log(dataComment);

  // xử lí thêm mới nhận xét
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const handleAddNewComment = () => {
    //nếu chưa đăng nhập đưa ra thông báo
    if (!userInfo) {
      Swal.fire({
        icon: "error",
        title: "Thêm nhận xét thất bại!",
        text: "Vui lòng đăng nhập để đăng nhận xét!",
        confirmButtonColor: "#d33",
      });
      return;
    }
    // nếu nhận xét ít hơn 40 kí tự đưa ra lỗi
    if (newComment.length < 40) {
      setError("Nhận xét ít nhất gồm 40 kí tự");
      return;
    }
    if (newComment.length > 400) {
      setError("Nhận xét nhiều nhất gồm 400 kí tự");
      return;
    } else {
      const dataToPostComment = {
        createdAt: Date.now(),
        username: userInfo.taiKhoan,
        content: newComment,
        rating: 0,
        like: 0,
        idMovie: id,
      };
      dispatch(postCommentAction(dataToPostComment));
      setError("");
      setNewComment("");
    }
  };

  return (
    <div className='addComment'>
      <h3>Thêm nhận xét mới</h3>
      <textarea
        name='addComment-textarea'
        className='addComment-textarea'
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>
      {error !== "" && <span className='text--primary'>{error}</span>}
      <button className='btn btn--primary addComment-btn' onClick={handleAddNewComment}>
        Nhận xét
      </button>
    </div>
  );
};
