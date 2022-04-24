import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
// component
import { Banner } from "components/Banner/Banner";
import { ModalBill } from "./components/ModalBill/ModalBill";
import { SeatingPlan } from "./components/SeatingPlan/SeatingPlan";
import { LoadingAnimation } from "components/LoadingAnimation/LoadingAnimation";
import { ModalAlert } from "pages/MovieTicketRoom/components/ModalAlert/ModalAlert";
import "./movieTicketRoom.scss";
// action
import {
  getTicketRoom,
  buyTicket,
  resetSelectingSeat,
} from "redux/actions/movie/movieTicketRoom.action";
// utilities
import { formatTimeTwoDigit } from "utilities/formatDate";

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

  //tính tổng tiền của các ghế
  const totalMoney = listSelectingSeat.reduce(function (prevValue, currentValue) {
    return prevValue + currentValue.giaVe;
  }, 0);

  const handleBuyTicket = async () => {
    const dataToBuyTicket = {
      maLichChieu: dataTicketRoom.thongTinPhim.maLichChieu.toString(),
      danhSachVe: listSelectingSeat,
    };
    // nếu chưa chọn 1 ghế nào cả -> hiện ra modal nhắc nhở
    if (dataToBuyTicket.danhSachVe.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Vui lòng chọn ghế",
        text: "Bạn chưa chọn ghế nào cả!",
        confirmButtonColor: "#d33",
      });
      return;
    }
    //không được chọn quá 10 ghế -> hiện modal nhắc nhở
    if (dataToBuyTicket.danhSachVe.length > 10) {
      Swal.fire({
        icon: "error",
        title: "Không chọn quá 10 ghế",
        text: "Bạn không được chọn quá 10 ghế!",
        confirmButtonColor: "#d33",
      });
      return;
    }
    // nếu chưa đăng nhập
    if (!userInfo) {
      Swal.fire({
        icon: "error",
        title: "Mua vé thất bại",
        text: "Vui lòng đăng nhập để tiếp tục mua vé!",
        confirmButtonColor: "#d33",
      });
      return;
    }
    const { isBuyTicketSuccess } = await dispatch(buyTicket(dataToBuyTicket));
    //nếu mua vé thành công hiện modal bill
    if (isBuyTicketSuccess) {
      setIsShowModalBill(true);
      clearInterval(idSetInterval.current);
    }
  };

  //đếm ngược thời gian giữ ghế
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
    //nếu chưa đăng nhập chuyển sang trang login
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
      {!isLoadingTicketRoom ? (
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
                {/* All information of Movie */}
                <InfoMovie
                  infoMovie={dataTicketRoom.thongTinPhim}
                  listSelectingSeat={listSelectingSeat}
                />

                {/* All infomation of User is buying ticket */}
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
      ) : (
        <LoadingAnimation />
      )}
    </>
  );
};

const MovieInfoField = (label, content) => (
  <div>
    <span className='label'>{label}:</span>
    {content}
  </div>
);

const InfoMovie = ({ infoMovie, listSelectingSeat }) => (
  <div className='movie-booking-info-movie'>
    <h2>Thông tin phim</h2>
    <div className='movie-booking-thumb'>
      <img src={infoMovie.hinhAnh} alt='movie-thumb' />
    </div>
    {MovieInfoField("Tên phim", infoMovie.tenPhim)}
    {MovieInfoField("Rạp", infoMovie.tenCumRap)}
    {MovieInfoField("Địa chỉ", infoMovie.diaChi)}
    {MovieInfoField("Suất chiếu", infoMovie.gioChieu + infoMovie.ngayChieu)}
    {/* All seat are selecting */}
    <div className='movie-booking-seats'>
      <span className='label'>Số ghế đã chọn:</span>
      {listSelectingSeat.length !== 0
        ? listSelectingSeat.map((c, index) => {
            // check if select 1 seat will not display ","
            // Eg: 3 seat : 3,5,9 -> 1 seat : 3
            const seat = index === 0 ? c.tenGhe : ", " + c.tenGhe;
            return seat;
          })
        : "Chưa chọn ghế"}
    </div>
  </div>
);

const InfoUser = ({ userInfo }) => (
  <div className='movie-booking-info-user'>
    <h2>Thông tin khách hàng</h2>
    {MovieInfoField("Họ tên", userInfo.hoTen)}
    {MovieInfoField("Email", userInfo.email)}
    {MovieInfoField("Số điện thoại", userInfo.soDT)}
  </div>
);
