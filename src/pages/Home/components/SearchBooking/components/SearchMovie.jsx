import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCinemaListToSearch, fetchMovieListToSearch } from "redux/actions/movieSearch.action";
import "./dropdown.scss";

export const SearchMovie = () => {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ tenPhim: "" });
  const { movieList } = useSelector((state) => state.movieSearch);

  // lấy danh sách các rạp có chiếu phim vừa chọn
  const handleGetCinemaList = (option) => {
    setSelectedOption(option);
    dispatch(fetchCinemaListToSearch(option.maPhim));
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
          <span title={selectedOption.tenPhim === "" ? "Select a state" : selectedOption.tenPhim}>
            {selectedOption.tenPhim === ""
              ? "Chọn phim"
              : selectedOption.tenPhim.length <= 20
              ? selectedOption.tenPhim
              : `${selectedOption.tenPhim.slice(0, 20)}...`}
          </span>
          <ion-icon name='caret-down-outline'></ion-icon>
        </div>
        {visibility && (
          <div className='options'>
            <ul>
              {movieList?.map((option, index) => (
                <li
                  key={index}
                  className={selectedOption === option ? "active-option" : null}
                  onClick={() => handleGetCinemaList(option)}
                >
                  {option.tenPhim}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
