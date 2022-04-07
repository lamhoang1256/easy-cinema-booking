import React, { useState } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import "./movieList.scss";

export const MovieList = (props) => {
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
          <MovieCard movie={item} key={index}></MovieCard>
        ))}
      </div>
      <button className='btn btn--primary' onClick={handleLoadMore}>
        Load more
      </button>
    </div>
  );
};
