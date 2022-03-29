import { useState } from "react";
import { Carousel } from "./components/Carousel/Carousel";
import { FilterBooking } from "./components/FilterBooking/FilterBooking";
import { ListMovie } from "./components/ListMovie/ListMovie";
import { ModalTrailer } from "./components/ModalTrailer/ModalTrailer";
import "./homePage.scss";

export const HomePage = () => {
  return (
    <div className='homePage'>
      <div className='homePage__top'>
        <Carousel />
        <ModalTrailer />
      </div>
      <FilterBooking />
      <ListMovie />
    </div>
  );
};
