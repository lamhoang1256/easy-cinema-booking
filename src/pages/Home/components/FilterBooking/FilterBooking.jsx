import React from "react";
import { useSelector } from "react-redux";
import { DropdownCinema } from "./components/DropdownCinema";
import { DropdownDay } from "./components/DropdownDay";
import { DropdownFilm } from "./components/DropdownFilm";
import { DropdownShowtime } from "./components/DropdownShowtime";
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
            <DropdownCinema />
            <DropdownDay />
            <DropdownShowtime />
          </div>
        </div>
      </div>
    </div>
  );
};
