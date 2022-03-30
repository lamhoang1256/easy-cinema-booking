import React from "react";
import { SingleMovie } from "../../../../components/SingleMovie/SingleMovie";
import "./listMovie.scss";

export const ListMovie = (props) => {
  const { listMovie } = props;
  // console.log(listMovie);
  return (
    <div className='listMovie'>
      {listMovie.map((item, index) => (
        <SingleMovie movie={item} key={index}></SingleMovie>
      ))}
    </div>
  );
};
