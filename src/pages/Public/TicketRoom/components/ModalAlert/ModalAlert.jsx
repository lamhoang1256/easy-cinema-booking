import React from "react";
import { useNavigate } from "react-router-dom";

export const ModalAlert = () => {
  const navigate = useNavigate();
  const handleComebackHome = () => {
    navigate("/");
  };
  const handleContinueBuyTicket = () => {
    window.location.reload();
  };

  return (
    <div className='modal'>
      <div className='modal-main'>
        <h2 className='modal-heading'>Hết thời gian giữ ghế!!</h2>
        <p>Quá 5 phút thời gian giữ ghế vui lòng đặt lại hoặc quay về trang chủ</p>
        <div className='modal-action'>
          <button className='btn' onClick={handleComebackHome}>
            Trở về trang chủ
          </button>
          <button className='btn btn--primary' onClick={handleContinueBuyTicket}>
            Tiếp tục đặt vé
          </button>
        </div>
      </div>
      <div className='modal-overplay'></div>
    </div>
  );
};
