import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./dropdown.scss";

export const DropdownShowtime = () => {
  const [visibility, setVisibility] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ ngayChieuGioChieu: "" });
  const { dataShowtime } = useSelector((state) => state.movieFilter);

  const getCinemaFilter = (openday) => {
    setSelectedOption(openday);
  };

  useEffect(() => {
    setSelectedOption({ ngayChieuGioChieu: "" });
  }, [dataShowtime]);

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
            {dataShowtime ? (
              <ul>
                {dataShowtime.map((option, index) => (
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
