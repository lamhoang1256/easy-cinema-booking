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

  // xử lí khi nhấn Tiếp tục đặt vé
  const handleContinueBuyTicket = () => {
    window.location.reload();
    window.scrollTo(0, 0);
  };

  return (
    <div className='modal'>
      <div className='modal-main'>
        <div className='modal-movie'>
          <div className='modal-thumb'>
            <img src={dataTicketRoom.thongTinPhim.hinhAnh} alt='modal-thumb' />
          </div>
          <div className='modal-info'>
            <div>
              <h2 className='modal-title'>{dataTicketRoom.thongTinPhim.tenPhim}</h2>
            </div>
            <div className='modal-cinema'>{dataTicketRoom.thongTinPhim.tenCumRap}</div>
            <div className='modal-address'>{dataTicketRoom.thongTinPhim.diaChi}</div>
            <div className='modal-openday'>
              <span className='info-label'>Suất chiếu:</span>
              {`${dataTicketRoom.thongTinPhim.gioChieu}  ${dataTicketRoom.thongTinPhim.ngayChieu}`}
            </div>
            <div className='modal-openday'>
              <span className='info-label'>Rạp:</span>
              {dataTicketRoom.thongTinPhim.tenRap}
            </div>
            <div className='modal-chairs'>
              <span className='info-label'>Ghế:</span>
              {listSelectingSeat.map((c, index) => {
                // check nếu chọn 1 ghế thì không xuất hiện dấu VD: 3,5 ; 3
                const chair = index === 0 ? " " + c.tenGhe : ", " + c.tenGhe;
                return chair;
              })}
            </div>
          </div>
        </div>
        {/* thông tin người dùng */}
        <div className='modal-user'>
          <h2>Thông tin đặt vé</h2>
          <p>
            <span className='user-label'>Họ tên: </span> {userInfo.hoTen}
          </p>
          <p>
            <span className='user-label'>Điện thoại: </span> {userInfo.soDT}
          </p>
          <p>
            <span className='user-label'>Email : </span> {userInfo.email}
          </p>
          <p>
            <span className='user-label'>Trạng thái : </span>
            <span className='success'>Đặt vé thành công</span>
          </p>
          <p>
            <span className='user-label'>Tổng tiền : </span> {totalMoney.toLocaleString("en-US")}{" "}
            VNĐ
          </p>
          <p>Kiểm tra lại thông tin vé đã đặt trong phần thông tin tài khoản của bạn !</p>
        </div>
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
