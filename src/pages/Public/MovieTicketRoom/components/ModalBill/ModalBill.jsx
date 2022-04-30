import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ModalBill = (props) => {
  const navigate = useNavigate();
  const { dataTicketRoom, listSelectingSeat } = useSelector((state) => state.movieTicketRoom);
  const { userInfo } = useSelector((state) => state.user);
  const { totalMoney } = props;

  const handleComebackHome = () => {
    navigate("/");
  };

  // handle when click button continue buy ticket
  const handleContinueBuyTicket = () => {
    window.location.reload();
    window.scrollTo(0, 0);
  };

  return (
    <div className='modal'>
      <div className='modal-main'>
        <ModalBillMovie
          movieInfo={dataTicketRoom.thongTinPhim}
          listSelectingSeat={listSelectingSeat}
        />
        <ModalBillUser userInfo={userInfo} totalMoney={totalMoney} />
        {/* button actions */}
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

const ModalBillField = (label, content) => (
  <div>
    <span className='user-label'>{label}: </span> {content}
  </div>
);

/* All information of Movie */
const ModalBillMovie = ({ movieInfo, listSelectingSeat }) => {
  return (
    <div className='modal-movie'>
      <div className='modal-thumb'>
        <img src={movieInfo.hinhAnh} alt='modal-thumb' />
      </div>
      <div className='modal-info'>
        <h2 className='modal-title'>{movieInfo.tenPhim}</h2>
        <div>{movieInfo.tenCumRap}</div>
        <div>{movieInfo.diaChi}</div>
        {ModalBillField("Suất chiếu", `${movieInfo.gioChieu} - ${movieInfo.ngayChieu}`)}
        {ModalBillField("Rạp", movieInfo.tenRap)}
        <div className='modal-chairs'>
          <span className='info-label'>Ghế:</span>
          {listSelectingSeat.map((seat, index) => {
            // check if select 1 seat will not display ","
            // Eg: 3 seat : 3,5,9 -> 1 seat : 3
            const chair = index === 0 ? " " + seat.tenGhe : ", " + seat.tenGhe;
            return chair;
          })}
        </div>
      </div>
    </div>
  );
};

// All infomation of User is buying ticket
const ModalBillUser = ({ userInfo, totalMoney }) => {
  return (
    <div className='modal-user'>
      <h2>Thông tin đặt vé</h2>
      {ModalBillField("Họ tên", userInfo.hoTen)}
      {ModalBillField("Email", userInfo.email)}
      {ModalBillField("Trạng thái", <span className='success'>Đặt vé thành công</span>)}
      {ModalBillField("Tổng tiền", totalMoney.toLocaleString("en-US") + "VNĐ")}
      <p>Kiểm tra lại thông tin vé đã đặt trong phần thông tin tài khoản của bạn !</p>
    </div>
  );
};
