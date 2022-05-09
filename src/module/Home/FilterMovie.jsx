import Filter from "components/Filter/Filter";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCinemaListToSearch,
  fetchMovieListToSearch,
} from "redux/actions/movie/movieFilter.action";

const FilterMovie = () => {
  const dispatch = useDispatch();
  const { movieList } = useSelector((state) => state.movieFilter);
  const [selectedMovie, setSelectedMovie] = useState({ tenPhim: "" });

  // lấy danh sách các rạp có chiếu phim vừa chọn
  const handleGetCinemaList = (movieSelected) => {
    setSelectedMovie(movieSelected);
    dispatch(fetchCinemaListToSearch(movieSelected.maPhim));
  };

  // lấy danh sách các tên phim
  useEffect(() => {
    dispatch(fetchMovieListToSearch());
  }, []);

  return (
    <Filter
      onChange={handleGetCinemaList}
      labelNotSelectItem='Chọn Phim'
      selectedItem={selectedMovie.tenPhim}
    >
      <ul>
        {movieList?.map((movie, index) => (
          <li
            key={index}
            className={selectedMovie === movie ? "active-option" : null}
            onClick={() => handleGetCinemaList(movie)}
          >
            {movie.tenPhim}
          </li>
        ))}
      </ul>
    </Filter>
  );
};

export default FilterMovie;
