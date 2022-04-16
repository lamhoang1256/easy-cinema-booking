import React from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "./components/Dropdown";
import "./filterBooking.scss";

export const FilterBooking = () => {
  const { data } = useSelector((state) => state.movieList);
  const list = data?.movieList;
  console.log(list);

  return (
    <div className='filter-booking'>
      <div className='container'>
        <div className='filter-container'>
          <div className='filter-boxed'>
            <span>Chọn phim</span>
            <Dropdown options={list} />
          </div>
        </div>
      </div>
    </div>
  );
};
