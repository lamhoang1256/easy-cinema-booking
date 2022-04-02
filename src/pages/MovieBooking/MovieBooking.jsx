import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlockChair } from "./components/BlockChair";
import { getMovieBookingAction } from "../../redux/actions/movieBooking.action";
import "./movieBooking.scss";

export const MovieBooking = () => {
  const dispatch = useDispatch();
  const { dataMovieBooking } = useSelector((state) => state.movieBooking);
  console.log(dataMovieBooking);
  useEffect(() => {
    dispatch(getMovieBookingAction());
  }, []);
  return (
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
                <BlockChair />
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
            <div className='movieBooking__title'>Tên phim: Trận chiến vũ trụ</div>
            <div className='movieBooking__cinema'>Rạp: BHD Star Cineplex - Bitexco</div>
            <div className='movieBooking__location'>
              Địa chỉ: L3-Bitexco Icon 68, 2 Hải Triều, Q.1
            </div>
            <div className='movieBooking__openday'>Suất chiếu: 09:06 ngày 30/06/2020</div>
            <div className='movieBooking__chairs'>Ghế chọn: E4, A3</div>
            <div className='movieBooking__price'>Giá : 100.000 VNĐ</div>
          </div>
        </div>
      </div>
    </div>
  );
};
