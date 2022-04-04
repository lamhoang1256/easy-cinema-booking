import React, { useState } from "react";
import { SingleMovie } from "../SingleMovie/SingleMovie";
import "./listMovie.scss";

export const ListMovie = (props) => {
  const [numMovie, setNumMovie] = useState(10);
  const { listMovie } = props;
  // handle loadmore
  const slice = listMovie.slice(0, numMovie);
  const handleLoadMore = () => {
    setNumMovie(numMovie + 5);
  };

  return (
    <div className='listmovie'>
      <div className='listmovie-container'>
        {slice.map((item, index) => (
          <SingleMovie movie={item} key={index}></SingleMovie>
        ))}
      </div>
      <button className='btn btn--primary' onClick={handleLoadMore}>
        Load more
      </button>
    </div>
  );
};
