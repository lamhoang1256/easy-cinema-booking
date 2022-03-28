import React from "react";
import { Carousel } from "./components/Carousel/Carousel";
import "./homePage.scss";

export const HomePage = () => {
  return (
    <div className='homePage'>
      <Carousel />
    </div>
  );
};
