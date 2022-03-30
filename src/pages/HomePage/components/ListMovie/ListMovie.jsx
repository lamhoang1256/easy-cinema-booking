import React, { useState } from "react";
import { SingleMovie } from "../../../../components/SingleMovie/SingleMovie";
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
    <div className='listMovie'>
      <div className='list'>
        {slice.map((item, index) => (
          <SingleMovie movie={item} key={index}></SingleMovie>
        ))}
      </div>
      <button className='btn btn__primary' onClick={handleLoadMore}>
        Load more
      </button>
    </div>
  );
};
