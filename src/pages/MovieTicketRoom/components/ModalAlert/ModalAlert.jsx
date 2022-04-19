import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTicketRoom, resetSelectingSeat } from "redux/actions/movie/movieTicketRoom.action";
import "./modalAlert.scss";

export const ModalAlert = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isModalBillVisible, setIsModalBillVisible, idTicketRoom } = props;

  // xử lí khi nhấn nút Quay về trang chủ
  const handleComebackHome = () => {
    navigate("/");
  };
  // xử lí khi nhấn Tiếp tục đặt vé
  const handleContinueBuyTicket = () => {
    dispatch(getTicketRoom(idTicketRoom));
    setIsModalBillVisible(!isModalBillVisible);
    dispatch(resetSelectingSeat());
    window.scrollTo(0, 0);
  };

  return (
    <div className='modal-bill'>
      <div className='modal-bill-main'>
        <h2 className='modal-bill-total'>Hết thời gian giữ ghế!!</h2>
        <p>Quá thời gian giữ ghế vui lòng đặt lại hoặc quay về trang chủ</p>
        {/* button actions */}
        <div className='modal-bill-action'>
          <button className='btn' onClick={handleComebackHome}>
            Trở về trang chủ
          </button>
          <button className='btn btn--primary' onClick={handleContinueBuyTicket}>
            Tiếp tục mua vé
          </button>
        </div>
      </div>
      <div className='modal-bill-overplay'></div>
    </div>
  );
};
{
  /* <div className='container'>
<input type='checkbox' id='check' />
<header>Hết thời gian giữ ghế!!</header>
<p>Quá thời gian giữ ghế vui lòng đặt lại hoặc quay về trang chủ</p>
<div className='btns'>
  <label htmlFor='check'>Yes, Delete!</label>
  <label htmlFor='check'>Cancel</label>
</div>
</div> */
}
