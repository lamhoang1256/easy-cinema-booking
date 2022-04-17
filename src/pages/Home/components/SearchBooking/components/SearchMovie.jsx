import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCinemaListToSearch, fetchMovieListToSearch } from "redux/actions/movieSearch.action";
import "./dropdown.scss";

export const SearchMovie = () => {
  const dispatch = useDispatch();
  const { movieList } = useSelector((state) => state.movieSearch);
  const [visibility, setVisibility] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({ tenPhim: "" });

  // lấy danh sách các rạp có chiếu phim vừa chọn
  const handleGetCinemaList = (movie) => {
    setSelectedMovie(movie);
    dispatch(fetchCinemaListToSearch(movie.maPhim));
  };

  useEffect(() => {
    dispatch(fetchMovieListToSearch());
  }, []);

  return (
    <div className='dropdown-menu'>
      <div
        className='select'
        onClick={(e) => {
          setVisibility(!visibility);
          e.currentTarget.children[0].children[1].innerHTML = visibility
            ? "arrow_drop_down"
            : "arrow_drop_up";
        }}
      >
        <div className='selected-option'>
          <span title={selectedMovie.tenPhim === "" ? "Chọn Phim" : selectedMovie.tenPhim}>
            {selectedMovie.tenPhim === ""
              ? "Chọn Phim"
              : selectedMovie.tenPhim.length <= 20
              ? selectedMovie.tenPhim
              : `${selectedMovie.tenPhim.slice(0, 20)}...`}
          </span>
          <ion-icon name='caret-down-outline'></ion-icon>
        </div>
        {visibility && (
          <div className='options'>
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
