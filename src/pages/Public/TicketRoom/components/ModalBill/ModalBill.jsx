import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ModalBill = (props) => {
  const navigate = useNavigate();
  const { dataTicketRoom, selectingSeatList } = useSelector((state) => state.TicketRoom);
  const { userInfo } = useSelector((state) => state.user);
  const { totalMoney } = props;

  const handleComebackHome = () => {
    navigate("/");
  };
  const handleContinueBuyTicket = () => {
    window.location.reload();
    window.scrollTo(0, 0);
  };

  return (
    <div className='modal'>
      <div className='modal-main'>
        <ModalBillMovie
          movieInfo={dataTicketRoom.thongTinPhim}
          selectingSeatList={selectingSeatList}
        />
        <ModalBillUser userInfo={userInfo} totalMoney={totalMoney} />
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

const ModalBillMovie = memo(({ movieInfo, selectingSeatList }) => {
  return (
    <div className='modal-movie'>
      <div className='modal-thumb'>
        <img src={movieInfo.hinhAnh} alt='modal-thumb' />
      </div>
      <div className='modal-info'>
        <h3 className='modal-title'>{movieInfo.tenPhim}</h3>
        <ModalBillField label='Tên rạp'>{movieInfo.tenCumRap}</ModalBillField>
        <ModalBillField label='Địa chỉ'>{movieInfo.diaChi}</ModalBillField>
        <ModalBillField label='Suất chiếu'>
          {movieInfo.gioChieu} - {movieInfo.ngayChieu}
        </ModalBillField>
        <ModalBillField label='Rạp'>{movieInfo.tenRap}</ModalBillField>
        <ModalBillField label='Ghế'>
          {selectingSeatList.map((seat, index) => {
            // if 3 seat : 3,5,9 -> if 1 seat : 3 (not ,)
            const chair = index === 0 ? " " + seat.tenGhe : ", " + seat.tenGhe;
            return chair;
          })}
        </ModalBillField>
      </div>
    </div>
  );
});

const ModalBillUser = memo(({ userInfo, totalMoney }) => {
  const generateRandomString = (length = 10) => Math.random().toString(20).substr(2, length);

  return (
    <div className='modal-user'>
      <div className='modal-profile'>
        <h3>Thông tin đặt vé</h3>
        <ModalBillField label='Họ tên'>{userInfo.hoTen}</ModalBillField>
        <ModalBillField label='Email'>{userInfo.email}</ModalBillField>
        <ModalBillField label='Trạng thái'>
          <span className='success'>Đặt vé thành công</span>)
        </ModalBillField>
        <ModalBillField label='Tổng tiền'>
          <span className='text--primary text-money'>
            {totalMoney.toLocaleString("en-US") + "VNĐ"}
          </span>
        </ModalBillField>
      </div>
      <div className='modal-barcode'>
        <img src={`${process.env.REACT_APP_PUBLIC}/assets/images/qrcode.png`} alt='qrcode' />
        <span>#{generateRandomString()}</span>
      </div>
    </div>
  );
});

const ModalBillField = ({ label, children }) => (
  <div>
    <span className='label'>{label}: </span> {children}
  </div>
);
