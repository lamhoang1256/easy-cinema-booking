import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
// component
import { ModalBill } from "./components/ModalBill/ModalBill";
import { BlockChair } from "./components/BlockChair/BlockChair";
import { LoadingAnimation } from "components/LoadingAnimation/LoadingAnimation";
// action
import { getMovieBookingAction, buyTicketAction } from "redux/actions/movieBuyTicket.action";
import "./movieBuyTicket.scss";
import { useParams } from "react-router-dom";
import { Banner } from "components/Banner/Banner";
// đường dẫn ảnh banner
const urlBanner = `url("${process.env.REACT_APP_PUBLIC}/assets/images/background-booking.jpg"
)`;

export const MovieBuyTicket = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const { dataMovieBooking, listGheDangChon, loading } = useSelector((state) => state.movieBooking);

  //tính tổng tiền của các ghế
  const totalMoney = listGheDangChon.reduce(function (prevValue, currentValue) {
    return prevValue + currentValue.giaVe;
  }, 0);

  const handleBuyTicket = async () => {
    const dataToBuyTicket = {
      maLichChieu: dataMovieBooking.thongTinPhim.maLichChieu.toString(),
      danhSachVe: listGheDangChon,
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
    const { isBuyTicketSuccess } = await dispatch(buyTicketAction(dataToBuyTicket));
    if (isBuyTicketSuccess) {
      setOpenModal(!openModal);
    }
  };

  useEffect(() => {
    dispatch(getMovieBookingAction(id));
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {!loading ? (
        <div className='movie-booking'>
          <Banner urlBanner={urlBanner} heading={"Trang đặt vé phim"} />
          <div className='container'>
            <div className='movie-booking-container'>
              <div className='movie-booking-left'>
                <div className='movie-booking-realtime'>
                  <p>Thời gian giữ ghế</p>
                  <p className='movie-booking-time'>05:00</p>
                </div>
                <div className='movie-booking-main'>
                  <div className='movie-booking-choice'>
                    <h3 className='movie-booking-title'>Chọn ghế</h3>
                    <div className='movie-booking-screen'>Màn hình</div>
                    <BlockChair
                      listGheDangChon={listGheDangChon}
                      danhSachGhe={dataMovieBooking.danhSachGhe}
                    />
                  </div>
                </div>
              </div>
              {/* Thông tin phim */}
              <div className='movie-booking-right'>
                <div className='movie-booking-info-movie'>
                  <h2>Thông tin phim</h2>

                  <div className='movie-booking-thumb'>
                    <img src={dataMovieBooking.thongTinPhim.hinhAnh} alt='movie-thumb' />
                  </div>
                  <div>
                    <div className='movie-booking-title'>
                      <span className='label'>Tên phim:</span>
                      {dataMovieBooking.thongTinPhim.tenPhim}
                    </div>
                    <div className='movie-booking-cinema'>
                      <span className='label'>Rạp: </span>
                      {dataMovieBooking.thongTinPhim.tenCumRap}
                    </div>
                    <div className='movie-booking-location'>
                      <span className='label'>Địa chỉ: </span>
                      {dataMovieBooking.thongTinPhim.diaChi}
                    </div>
                    <div className='movie-booking-openday'>
                      <span className='label'>Suất chiếu: </span>
                      {dataMovieBooking.thongTinPhim.gioChieu}{" "}
                      {dataMovieBooking.thongTinPhim.ngayChieu}
                    </div>
                    <div className='movie-booking-chairs'>
                      <span className='label'>Số ghế đã chọn:</span>
                      {listGheDangChon.length !== 0
                        ? listGheDangChon.map((c, index) => {
                            // check nếu chọn 1 ghế thì không xuất hiện dấu VD: 3,5 ; 3
                            const chair = index === 0 ? c.tenGhe : ", " + c.tenGhe;
                            return chair;
                          })
                        : "Chưa chọn ghế"}
                    </div>
                  </div>
                </div>
                <div className='movie-booking-info-user'>
                  <h2>Thông tin khách hàng</h2>
                  <div className='movie-booking-openday'>
                    <span className='label'>Họ tên: </span>
                    Nguyễn Hoàng Lâm
                  </div>
                  <div className='movie-booking-email'>
                    <span className='label'>Email: </span>
                    lamhoang@gmail.com
                  </div>
                  <div className='movie-booking-phone'>
                    <span className='label'>Số điện thoại: </span>
                    0830384028
                  </div>
                </div>
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
          {/* mở modal bill khi đặt vé thành công  */}
          {openModal && (
            <ModalBill setOpenModall={setOpenModal} openModal={openModal} totalMoney={totalMoney} />
          )}
        </div>
      ) : (
        <LoadingAnimation />
      )}
    </>
  );
};
