import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCinemaListToSearch, fetchMovieListToSearch } from "redux/actions/movieFilter.action";
import "./filter.scss";

export const FilterMovie = () => {
  const dispatch = useDispatch();
  const { movieList } = useSelector((state) => state.movieFilter);
  const [visibility, setVisibility] = useState(false);
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
    <div className='filter-menu'>
      <div
        className='filter-select'
        onClick={(e) => {
          setVisibility(!visibility);
          e.currentTarget.children[0].children[1].innerHTML = visibility
            ? "arrow_drop_down"
            : "arrow_drop_up";
        }}
      >
        <div className='filter-selected-option'>
          <span title={selectedMovie.tenPhim === "" ? "Chọn Phim" : selectedMovie.tenPhim}>
            {selectedMovie.tenPhim === "" ? "Chọn Phim" : selectedMovie.tenPhim}
          </span>
          <ion-icon name='caret-down-outline'></ion-icon>
        </div>
        {/* Danh sách tên PHIM */}
        {visibility && (
          <div className='filter-options'>
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
          </div>
        )}
      </div>
    </div>
  );
};
