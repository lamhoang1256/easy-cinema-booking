import React from "react";
import "./banner.scss";

export const Banner = ({ urlBanner, heading }) => {
  return (
    <div className='banner' style={{ backgroundImage: urlBanner }}>
      <h2 className='banner-heading'>{heading}</h2>
    </div>
  );
};
