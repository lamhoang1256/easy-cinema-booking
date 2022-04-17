import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SearchCinema } from "./components/SearchCinema";
import { SearchOpenday } from "./components/SearchOpenday";
import { SearchMovie } from "./components/SearchMovie";
import { SearchShowtime } from "./components/SearchShowtime";
import "./searchBooking.scss";

export const SearchBooking = () => {
  const { idBooking } = useSelector((state) => state.movieSearch);

  return (
    <div className='filter-booking'>
      <div className='container'>
        <div className='filter-container'>
          <div className='filter-boxed'>
            <span>Chọn phim</span>
            <SearchMovie />
          </div>
          <div className='filter-boxed'>
            <span>Chọn rạp chiếu</span>
            <SearchCinema />
          </div>
          <div className='filter-boxed'>
            <span>Chọn ngày xem</span>
            <SearchOpenday />
          </div>
          <div className='filter-boxed'>
            <span>Chọn suất chiếu</span>
            <SearchShowtime />
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
