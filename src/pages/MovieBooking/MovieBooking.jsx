import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlockChair } from "./components/BlockChair";
import { buyTicketAction, getMovieBookingAction } from "../../redux/actions/movieBooking.action";
import "./movieBooking.scss";

export const MovieBooking = () => {
  const dispatch = useDispatch();
  const { dataMovieBooking, listGheDangChon, loading } = useSelector((state) => state.movieBooking);

  //tính tổng tiền của các ghế
  const totalMoney = listGheDangChon.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue.giaVe;
  }, 0);

  // console.log(dataMovieBooking, loading);
  const handleBuyTicket = () => {
    const dataToBuyTicket = {
      maLichChieu: dataMovieBooking.thongTinPhim.maLichChieu.toString(),
      danhSachVe: listGheDangChon,
    };
    dispatch(buyTicketAction(dataToBuyTicket));
    dispatch(getMovieBookingAction());
  };

  useEffect(() => {
    dispatch(getMovieBookingAction());
  }, []);
  return (
    <>
      {!loading ? (
        <div className='movie-booking'>
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
              <div className='movie-booking-right'>
                {/* <div className='movie-booking-thumb'>
                  <img
                    src='http://movie0706.cybersoft.edu.vn/hinhanh/tran-chien-midway_gp09.jpg'
                    alt=''
                  />
                </div> */}
                <div className='movie-booking-title'>
                  Tên phim: {dataMovieBooking.thongTinPhim.tenPhim}
                </div>
                <div className='movie-booking-cinema'>
                  Rạp: {dataMovieBooking.thongTinPhim.tenCumRap}
                </div>
                <div className='movie-booking-location'>
                  Địa chỉ: {dataMovieBooking.thongTinPhim.diaChi}
                </div>
                <div className='movie-booking-openday'>
                  Suất chiếu: {dataMovieBooking.thongTinPhim.gioChieu}{" "}
                  {dataMovieBooking.thongTinPhim.ngayChieu}
                </div>
                <div className='movie-booking-chairs'>Ghế chọn: E4, A3</div>
                <div className='movie-booking-price'>Giá : {totalMoney} VNĐ</div>
                <button className='btn btn--primary' onClick={handleBuyTicket}>
                  Đặt vé
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
};
