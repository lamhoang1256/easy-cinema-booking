import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlockChair } from "./components/BlockChair";
import { getMovieBookingAction } from "../../redux/actions/movieBooking.action";
import "./movieBooking.scss";

export const MovieBooking = () => {
  const dispatch = useDispatch();
  const { dataMovieBooking, loading } = useSelector((state) => state.movieBooking);
  console.log(dataMovieBooking, loading);

  useEffect(() => {
    dispatch(getMovieBookingAction());
  }, []);
  return (
    <>
      {!loading ? (
        <div className='movieBooking'>
          <div className='container'>
            <div className='movieBooking__container'>
              <div className='movieBooking__left'>
                <div className='movieBooking__realtime'>
                  <p>Thời gian giữ ghế</p>
                  <p className='time'>05:00</p>
                </div>
                <div className='movieBooking__main'>
                  <div className='movieBooking__choice'>
                    <h3 className='movieBooking__title'>Chọn ghế</h3>
                    <div className='movieBooking__screen'>Màn hình</div>
                    <BlockChair danhSachGhe={dataMovieBooking.danhSachGhe} />
                  </div>
                </div>
              </div>
              <div className='movieBooking__right'>
                {/* <div className='movieBooking__thumb'>
                  <img
                    src='http://movie0706.cybersoft.edu.vn/hinhanh/tran-chien-midway_gp09.jpg'
                    alt=''
                  />
                </div> */}
                <div className='movieBooking__title'>
                  Tên phim: {dataMovieBooking.thongTinPhim.tenPhim}
                </div>
                <div className='movieBooking__cinema'>
                  Rạp: {dataMovieBooking.thongTinPhim.tenCumRap}
                </div>
                <div className='movieBooking__location'>
                  Địa chỉ: {dataMovieBooking.thongTinPhim.diaChi}
                </div>
                <div className='movieBooking__openday'>
                  Suất chiếu: {dataMovieBooking.thongTinPhim.gioChieu}{" "}
                  {dataMovieBooking.thongTinPhim.ngayChieu}
                </div>
                <div className='movieBooking__chairs'>Ghế chọn: E4, A3</div>
                <div className='movieBooking__price'>Giá : 0 VNĐ</div>
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
