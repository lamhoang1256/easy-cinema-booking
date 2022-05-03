import React, { memo, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// component
import { Banner } from "components/Banner/Banner";
import { ModalBill } from "./components/ModalBill/ModalBill";
import SeatingPlan from "./components/SeatingPlan/SeatingPlan";
import { LoadingAnimation } from "components/LoadingAnimation/LoadingAnimation";
import { ModalAlert } from "pages/Public/MovieTicketRoom/components/ModalAlert/ModalAlert";
import "./movieTicketRoom.scss";
// action
import {
  getTicketRoom,
  buyTicket,
  resetSelectingSeat,
} from "redux/actions/movie/movieTicketRoom.action";
// utilities
import { formatTimeTwoDigit } from "utilities/formatDate";
import { sweetAlert } from "utilities/sweetAlert";

// đường dẫn ảnh banner
const urlBanner = `url("${process.env.REACT_APP_PUBLIC}/assets/images/background-booking.jpg"
)`;

export const MovieTicketRoom = () => {
  const { idTicketRoom } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const { dataTicketRoom, listSelectingSeat, isLoadingTicketRoom } = useSelector(
    (state) => state.movieTicketRoom
  );

  const [isShowModalBill, setIsShowModalBill] = useState(false);
  const [isShowModalAlert, setIsShowModalAlert] = useState(false);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  // calculate money buy ticket
  const totalMoney = listSelectingSeat.reduce(function (prevValue, currentValue) {
    return prevValue + currentValue.giaVe;
  }, 0);

  const handleBuyTicket = async () => {
    const requestBuyTicket = {
      maLichChieu: dataTicketRoom.thongTinPhim.maLichChieu.toString(),
      danhSachVe: listSelectingSeat,
    };
    // if select 0 seat -> show modal notify error
    if (requestBuyTicket.danhSachVe.length === 0) {
      sweetAlert("error", "Vui lòng chọn ghế", "Bạn chưa chọn ghế nào cả!", "#d33");
      return;
    }
    // if select over 10 seat -> show modal notify
    if (requestBuyTicket.danhSachVe.length > 10) {
      sweetAlert("error", "Không chọn quá 10 ghế", "Bạn không được chọn quá 10 ghế!", "#d33");
      return;
    }
    // if user not login
    if (!userInfo) {
      sweetAlert("error", "Mua vé thất bại", "Vui lòng đăng nhập để tiếp tục mua vé!", "#d33");
      return;
    }
    const { isBuyTicketSuccess } = await dispatch(buyTicket(requestBuyTicket));
    // if buy ticket successful open modal bill
    if (isBuyTicketSuccess) {
      setIsShowModalBill(true);
      clearInterval(idSetInterval.current);
    }
  };

  // countdown time select seat (5 min -> 0 seconds)
  const idSetInterval = useRef();
  const countDownTimeBooking = () => {
    idSetInterval.current = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setIsShowModalAlert(true);
          clearInterval(idSetInterval.current);
        } else {
          setMinutes(minutes - 1);
          setSeconds(() => 59);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    countDownTimeBooking();
    return () => {
      clearInterval(idSetInterval.current);
    };
  }, [seconds]);

  useEffect(() => {
    // if user not login -> redirect to login
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
      {isLoadingTicketRoom && <LoadingAnimation />}
      {!isLoadingTicketRoom && (
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
                  <div className='movie-booking-choice'>
                    <h3 className='movie-booking-title'>Chọn ghế</h3>
                    <div className='movie-booking-screen'>Màn hình</div>
                    <SeatingPlan
                      listSelectingSeat={listSelectingSeat}
                      danhSachGhe={dataTicketRoom.danhSachGhe}
                    />
                  </div>
                </div>
              </div>

              <div className='movie-booking-right'>
                <InfoMovie
                  infoMovie={dataTicketRoom.thongTinPhim}
                  listSelectingSeat={listSelectingSeat}
                />
                <InfoUser userInfo={userInfo} />
                {/* Total money and button buy ticket */}
                <div className='movie-booking-bill'>
                  <h2 className='movie-booking-price'>
                    Tổng tiền: {totalMoney.toLocaleString("en-US")} VNĐ
                  </h2>
                </div>
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

const InfoMovieField = ({ label, children }) => (
  <div>
    <span className='label'>{label}:</span>
    {children}
  </div>
);

/* All information of Movie */
const InfoMovie = memo(({ infoMovie, listSelectingSeat }) => (
  <div className='movie-booking-info-movie'>
    <h2>Thông tin phim</h2>
    <div className='movie-booking-thumb'>
      <img src={infoMovie.hinhAnh} alt='movie-thumb' />
    </div>
    <InfoMovieField label='Tên phim'>{infoMovie.tenPhim}</InfoMovieField>
    <InfoMovieField label='Rạp'>{infoMovie.tenCumRap}</InfoMovieField>
    <InfoMovieField label='Địa chỉ'>{infoMovie.diaChi}</InfoMovieField>
    <InfoMovieField label='Suất chiếu'>{`${infoMovie.gioChieu} ${infoMovie.ngayChieu}`}</InfoMovieField>
    <InfoMovieField label='Số ghế đã chọn'>
      {listSelectingSeat.length !== 0
        ? listSelectingSeat.map((seat, index) => {
            // check if select 1 seat will not display ","  Eg: 3 seat : 3,5,9 -> 1 seat : 3
            return index === 0 ? seat.tenGhe : `, ${seat.tenGhe}`;
          })
        : "Chưa chọn ghế"}
    </InfoMovieField>
  </div>
));

// All infomation of User is buying ticket
const InfoUser = memo(({ userInfo }) => (
  <div className='movie-booking-info-user'>
    <h2>Thông tin khách hàng</h2>
    <InfoMovieField label='Họ tên'>{userInfo.hoTen}</InfoMovieField>
    <InfoMovieField label='Email'>{userInfo.email}</InfoMovieField>
    <InfoMovieField label='Số điện thoại'>{userInfo.soDT}</InfoMovieField>
  </div>
));
