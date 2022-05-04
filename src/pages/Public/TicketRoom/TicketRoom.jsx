import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// component
import Banner from "components/Banner/Banner";
import { ModalBill } from "./components/ModalBill/ModalBill";
import SeatingPlan from "./components/SeatingPlan/SeatingPlan";
import LoadingAnimation from "components/LoadingAnimation/LoadingAnimation";
import { ModalAlert } from "pages/Public/TicketRoom/components/ModalAlert/ModalAlert";
import "./ticketRoom.scss";
// action
import {
  getTicketRoom,
  buyTicket,
  resetSelectingSeat,
} from "redux/actions/movie/ticketRoom.action";
// utilities
import { useCountDownBooking } from "hooks/useCountDownBooking";
import { formatTimeTwoDigit } from "utilities/formatDate";
import { sweetAlert } from "utilities/sweetAlert";
import { calculateSum } from "utilities/calculateSum";

const urlBanner = `url("${process.env.REACT_APP_PUBLIC}/assets/images/background-booking.jpg"
)`;
export const TicketRoom = () => {
  const { idTicketRoom } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const { isLoading, dataTicketRoom, selectingSeatList } = useSelector((state) => state.TicketRoom);

  const [isShowModalBill, setIsShowModalBill] = useState(false);
  const [isShowModalAlert, setIsShowModalAlert] = useState(false);
  const totalMoney = calculateSum(selectingSeatList, "giaVe");

  const handleBuyTicket = async () => {
    const requestBuyTicket = {
      maLichChieu: dataTicketRoom.thongTinPhim.maLichChieu.toString(),
      danhSachVe: selectingSeatList,
    };
    if (requestBuyTicket.danhSachVe.length === 0) {
      sweetAlert("error", "Vui lòng chọn ghế", "Bạn chưa chọn ghế nào cả!");
      return;
    }
    if (requestBuyTicket.danhSachVe.length > 10) {
      sweetAlert("error", "Không chọn quá 10 ghế", "Bạn không được chọn quá 10 ghế!");
      return;
    }
    if (!userInfo) {
      sweetAlert("error", "Mua vé thất bại", "Vui lòng đăng nhập để tiếp tục mua vé!");
      return;
    }
    const { isBuyTicketSuccess } = await dispatch(buyTicket(requestBuyTicket));
    if (isBuyTicketSuccess) {
      setIsShowModalBill(true);
      clearInterval(idSetInterval.current);
    }
  };

  // countdown time select seat (5 min -> 0 seconds)
  const { idSetInterval, minutes, seconds } = useCountDownBooking(setIsShowModalAlert);

  useEffect(() => {
    if (!userInfo) {
      navigate("/auth/login");
      return;
    }
    window.scrollTo(0, 0);
    dispatch(getTicketRoom(idTicketRoom));
    dispatch(resetSelectingSeat());
  }, [idTicketRoom]);

  return (
    <>
      {isLoading && <LoadingAnimation />}
      {!isLoading && (
        <div className='movie-booking'>
          <Banner urlBanner={urlBanner} heading={"Trang đặt vé phim"} />
          <div className='container'>
            <div className='movie-booking-container'>
              <div className='movie-booking-left'>
                <div className='movie-booking-realtime'>
                  <p>Thời gian giữ ghế</p>
                  <p className='movie-booking-time'>{formatTimeTwoDigit(minutes, seconds)}</p>
                </div>
                <div className='movie-booking-main'>
                  <h3 className='movie-booking-title'>Chọn ghế</h3>
                  <div className='movie-booking-screen'>Màn hình</div>
                  <SeatingPlan
                    selectingSeatList={selectingSeatList}
                    danhSachGhe={dataTicketRoom.danhSachGhe}
                  />
                </div>
              </div>

              <div className='movie-booking-right'>
                <InfoMovie
                  infoMovie={dataTicketRoom.thongTinPhim}
                  selectingSeatList={selectingSeatList}
                />
                <InfoUser userInfo={userInfo} />
                <h2 className='movie-booking-price'>Tổng tiền: {totalMoney} VNĐ</h2>
                <button className='btn btn--primary' onClick={handleBuyTicket}>
                  Đặt vé
                </button>
              </div>
            </div>
          </div>
          {/* open modal bill when buy ticket successful  */}
          {isShowModalBill && <ModalBill totalMoney={totalMoney} />}
          {/* open modal notify if select seat over 5 minutes */}
          {isShowModalAlert && <ModalAlert />}
        </div>
      )}
    </>
  );
};

const InfoMovie = memo(({ infoMovie, selectingSeatList }) => {
  const { hinhAnh, tenPhim, tenCumRap, diaChi, gioChieu, ngayChieu } = infoMovie;
  return (
    <div className='movie-booking-info-movie'>
      <h2>Thông tin phim</h2>
      <div className='movie-booking-thumb'>
        <img src={hinhAnh} alt='movie-thumb' />
      </div>
      <InfoItem label='Tên phim'>{tenPhim}</InfoItem>
      <InfoItem label='Rạp'>{tenCumRap}</InfoItem>
      <InfoItem label='Địa chỉ'>{diaChi}</InfoItem>
      <InfoItem label='Suất chiếu'>{`${gioChieu} ${ngayChieu}`}</InfoItem>
      <InfoItem label='Số ghế đã chọn'>
        {selectingSeatList.length !== 0
          ? selectingSeatList.map((seat, index) => {
              // Eg: if 3 seat : 3,5,9 -> if 1 seat : 3 (not ,)
              return index === 0 ? seat.tenGhe : `, ${seat.tenGhe}`;
            })
          : "Chưa chọn ghế"}
      </InfoItem>
    </div>
  );
});

const InfoUser = memo(({ userInfo }) => {
  const { hoTen, email, soDT } = userInfo;
  return (
    <div className='movie-booking-info-user'>
      <h2>Thông tin khách hàng</h2>
      <InfoItem label='Họ tên'>{hoTen}</InfoItem>
      <InfoItem label='Email'>{email}</InfoItem>
      <InfoItem label='Số điện thoại'>{soDT}</InfoItem>
    </div>
  );
});

const InfoItem = ({ label, children }) => (
  <div>
    <span className='label'>{label}:</span>
    {children}
  </div>
);
