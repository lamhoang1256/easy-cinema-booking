import React from "react";
import "./banner.scss";

export const Banner = ({ urlBanner, heading }) => {
  return (
    <div className='banner' style={{ backgroundImage: urlBanner }}>
      <div className='banner-heading'>
        <h2>{heading}</h2>
      </div>
    </div>
  );
};
