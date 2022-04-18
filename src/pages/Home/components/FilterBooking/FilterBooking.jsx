import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FilterCinema } from "./components/FilterCinema";
import { FilterOpenday } from "./components/FilterOpenday";
import { FilterMovie } from "./components/FilterMovie";
import { FilterShowtime } from "./components/FilterShowtime";
import "./filterBooking.scss";

export const FilterBooking = () => {
  const { idBooking } = useSelector((state) => state.movieSearch);

  return (
    <div className='filter-booking'>
      <div className='container'>
        <div className='filter-container'>
          <div className='filter-boxed'>
            <span>Chọn phim</span>
            <FilterMovie />
          </div>
          <div className='filter-boxed'>
            <span>Chọn rạp chiếu</span>
            <FilterCinema />
          </div>
          <div className='filter-boxed'>
            <span>Chọn ngày xem</span>
            <FilterOpenday />
          </div>
          <div className='filter-boxed'>
            <span>Chọn suất chiếu</span>
            <FilterShowtime />
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
