import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdToBooking } from "redux/actions/movieSearch.action";
import "./dropdown.scss";

export const SearchShowtime = () => {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ ngayChieuGioChieu: "" });
  const { showtimeList } = useSelector((state) => state.movieSearch);

  const getCinemaFilter = (openday) => {
    setSelectedOption(openday);
    dispatch(getIdToBooking(openday.maLichChieu));
  };

  useEffect(() => {
    setSelectedOption({ ngayChieuGioChieu: "" });
  }, [showtimeList]);

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
          <span
            title={
              selectedOption.ngayChieuGioChieu === ""
                ? "Select a state"
                : selectedOption.ngayChieuGioChieu
            }
          >
            {selectedOption.ngayChieuGioChieu === ""
              ? "Chọn suất chiếu"
              : selectedOption.ngayChieuGioChieu.length <= 20
              ? selectedOption.ngayChieuGioChieu
              : `${selectedOption.ngayChieuGioChieu.slice(0, 20)}...`}
          </span>
          <ion-icon name='caret-down-outline'></ion-icon>
        </div>
        {visibility && (
          <div className='options'>
            {showtimeList ? (
              <ul>
                {showtimeList.map((option, index) => (
                  <li
                    key={index}
                    className={selectedOption === option ? "active-option" : null}
                    onClick={() => getCinemaFilter(option)}
                  >
                    {option.ngayChieuGioChieu}
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                <li>Vui lòng chọn ngày</li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
