import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCinemaFilterAction } from "redux/actions/movieFilter.action";
import "./dropdown.scss";

export const DropdownFilm = ({ options }) => {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ tenPhim: "" });
  // console.log(selectedOption);
  const getCinemaFilter = (option) => {
    setSelectedOption(option);
    dispatch(getCinemaFilterAction(option.maPhim));
  };

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
              {options.map((option, index) => (
                <li
                  key={index}
                  className={selectedOption === option ? "active-option" : null}
                  onClick={() => getCinemaFilter(option)}
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
