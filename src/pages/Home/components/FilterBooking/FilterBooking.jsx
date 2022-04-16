import React from "react";
import { useSelector } from "react-redux";
import { DropdownCinema } from "./components/DropdownCinema";
import { DropdownFilm } from "./components/DropdownFilm";
import "./filterBooking.scss";

export const FilterBooking = () => {
  const { data } = useSelector((state) => state.movieList);
  const list = data?.movieList;

  return (
    <div className='filter-booking'>
      <div className='container'>
        <div className='filter-container'>
          <div className='filter-boxed'>
            <span>Chọn phim</span>
            <DropdownFilm options={list} />
            <DropdownCinema options={list} />
          </div>
        </div>
      </div>
    </div>
  );
};
