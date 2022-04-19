import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTicketRoom, resetSelectingSeat } from "redux/actions/movie/movieTicketRoom.action";
import "./modalBill.scss";

export const ModalBill = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isModalAlertVisible, setIsModalAlertVisible, totalMoney, idTicketRoom } = props;
  const { dataTicketRoom, listSelectingSeat } = useSelector((state) => state.movieTicketRoom);
  const { userInfo } = useSelector((state) => state.user);

  // xử lí khi nhấn nút Quay về trang chủ
  const handleComebackHome = () => {
    navigate("/");
  };
  // xử lí khi nhấn Tiếp tục đặt vé
  const handleContinueBuyTicket = () => {
    dispatch(getTicketRoom(idTicketRoom));
    setIsModalAlertVisible(!isModalAlertVisible);
    dispatch(resetSelectingSeat());
    window.scrollTo(0, 0);
  };

  return (
    <div className='modal-bill'>
      <div className='modal-bill-main'>
        <div className='modal-bill-movie'>
          <div className='modal-bill-thumb'>
            <img src={dataTicketRoom.thongTinPhim.hinhAnh} alt='modal-thumb' />
          </div>
          <div className='modal-bill-info'>
            <div>
              <h2 className='modal-bill-title'>{dataTicketRoom.thongTinPhim.tenPhim}</h2>
            </div>
            <div className='modal-bill-cinema'>{dataTicketRoom.thongTinPhim.tenCumRap}</div>
            <div className='modal-bill-address'>{dataTicketRoom.thongTinPhim.diaChi}</div>
            <div className='modal-bill-openday'>
              <span className='info-label'>Suất chiếu:</span>
              {`${dataTicketRoom.thongTinPhim.gioChieu}  ${dataTicketRoom.thongTinPhim.ngayChieu}`}
            </div>
            <div className='modal-bill-openday'>
              <span className='info-label'>Rạp:</span>
              {dataTicketRoom.thongTinPhim.tenRap}
            </div>
            <div className='modal-bill-chairs'>
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
        <div className='modal-bill-user'>
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
