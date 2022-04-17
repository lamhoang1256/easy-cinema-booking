import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShowtimeListToSearch } from "redux/actions/movieSearch.action";
import "./dropdown.scss";

export const SearchOpenday = () => {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ ngayChieuGioChieu: "" });
  const { opendayList } = useSelector((state) => state.movieSearch);
  let unique = opendayList?.reduce((accumulator, current) => {
    if (
      !accumulator.some(
        (x) => x.ngayChieuGioChieu.split("T")[0] === current.ngayChieuGioChieu.split("T")[0]
      )
    ) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);

  const getCinemaFilter = (openday) => {
    setSelectedOption(openday);
    dispatch(fetchShowtimeListToSearch(openday));
  };

  useEffect(() => {
    setSelectedOption({ ngayChieuGioChieu: "" });
  }, [opendayList]);

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
              ? "Chọn ngày"
              : selectedOption.ngayChieuGioChieu.length <= 20
              ? selectedOption.ngayChieuGioChieu
              : `${selectedOption.ngayChieuGioChieu.slice(0, 20)}...`}
          </span>
          <ion-icon name='caret-down-outline'></ion-icon>
        </div>
        {visibility && (
          <div className='options'>
            {unique ? (
              <ul>
                {unique.map((option, index) => (
                  <li
                    key={index}
                    className={selectedOption === option ? "active-option" : null}
                    onClick={() => getCinemaFilter(option)}
                  >
                    {new Date(option.ngayChieuGioChieu.split("T")[0]).toLocaleDateString("vi-VI")}
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                <li>Vui lòng chọn rạp</li>
              </ul>
            )}
          </div>
        )}
      </div>{" "}
    </div>
  );
};
