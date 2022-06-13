import Filter from "components/Filter/Filter";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCinemaListToSearch, fetchMovieListToSearch } from "redux/actions/movieFilter.action";

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
    <Filter onChange={handleGetCinemaList} labelNotSelect="Chọn Phim" title={selectedMovie.tenPhim}>
      {movieList?.map((movie, index) => {
        const isActive = selectedMovie === movie ? "active-option" : null;
        return (
          <li key={index} className={isActive} onClick={() => handleGetCinemaList(movie)}>
            {movie.tenPhim}
          </li>
        );
      })}
    </Filter>
  );
};

export default FilterMovie;
