import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMovieBookingAction, resetSelectingChair } from "redux/actions/movieBuyTicket.action";
import "./modalBill.scss";

export const ModalBill = ({ openModal, setOpenModall, totalMoney }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataMovieBooking, listGheDangChon } = useSelector((state) => state.movieBooking);

  const handleComebackHome = () => {
    navigate("/");
  };

  const handleContinueBuyTicket = () => {
    dispatch(getMovieBookingAction());
    setOpenModall(!openModal);
    dispatch(resetSelectingChair());
    window.scrollTo(0, 0);
  };

  return (
    <div className='modal-bill'>
      <div className='modal-bill-main'>
        <div className='modal-bill-movie'>
          <div className='modal-bill-thumb'>
            <img
              src='http://movie0706.cybersoft.edu.vn/hinhanh/tran-chien-midway_gp09.jpg'
              alt=''
            />
          </div>
          <div className='modal-bill-info'>
            <div>
              <h2 className='modal-bill-title'>{dataMovieBooking.thongTinPhim.tenPhim}</h2>
            </div>
            <div className='modal-bill-cinema'>{dataMovieBooking.thongTinPhim.tenCumRap}</div>
            <div className='modal-bill-address'>{dataMovieBooking.thongTinPhim.diaChi}</div>
            <div className='modal-bill-openday'>
              <span className='info-label'>Suất chiếu:</span>
              {`${dataMovieBooking.thongTinPhim.gioChieu}  ${dataMovieBooking.thongTinPhim.ngayChieu}`}
            </div>
            <div className='modal-bill-openday'>
              <span className='info-label'>Rạp:</span>
              {dataMovieBooking.thongTinPhim.tenRap}
            </div>
            <div className='modal-bill-chairs'>
              <span className='info-label'>Ghế:</span>
              {listGheDangChon.map((c, index) => {
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
            <span className='user-label'>Họ tên: </span> Nguyễn Hoàng Lâm
          </p>
          <p>
            <span className='user-label'>Điện thoại: </span> 0893832123
          </p>
          <p>
            <span className='user-label'>Email : </span> hoanglam@gmail.com
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
