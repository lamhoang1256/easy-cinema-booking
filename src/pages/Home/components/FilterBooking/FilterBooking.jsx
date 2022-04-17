import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownCinema } from "./components/DropdownCinema";
import { DropdownDay } from "./components/DropdownDay";
import { DropdownFilm } from "./components/DropdownFilm";
import { DropdownShowtime } from "./components/DropdownShowtime";
import "./filterBooking.scss";

export const FilterBooking = () => {
  const { data } = useSelector((state) => state.movieList);
  const { idBooking } = useSelector((state) => state.movieFilter);

  return (
    <div className='filter-booking'>
      <div className='container'>
        <div className='filter-container'>
          <div className='filter-boxed'>
            <span>Chọn phim</span>
            <DropdownFilm />
          </div>
          <div className='filter-boxed'>
            <span>Chọn rạp chiếu</span>
            <DropdownCinema />
          </div>
          <div className='filter-boxed'>
            <span>Chọn ngày xem</span>
            <DropdownDay />
          </div>
          <div className='filter-boxed'>
            <span>Chọn suất chiếu</span>
            <DropdownShowtime />
          </div>
          <div className='filter-boxed'>
            {idBooking ? (
              <Link to={`/booking/${idBooking}`}>
                <button className={`btn ${idBooking ? "btn--primary" : ""}`}>Đặt vé</button>
              </Link>
            ) : (
              <button className={`btn`}>Đặt vé</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
