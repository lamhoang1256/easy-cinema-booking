import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdToBooking } from "redux/actions/movieSearch.action";
import "./dropdown.scss";

export const SearchShowtime = () => {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  const [selectedShowtime, setSelectedShowtime] = useState({ ngayChieuGioChieu: "" });
  const { showtimeList } = useSelector((state) => state.movieSearch);

  // lấy id phòng chiếu để chuyển sang đặt vé
  const handleGetIdBooking = (openday) => {
    setSelectedShowtime(openday);
    dispatch(getIdToBooking(openday.maLichChieu));
  };

  useEffect(() => {
    setSelectedShowtime({ ngayChieuGioChieu: "" });
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
              selectedShowtime.ngayChieuGioChieu === ""
                ? "Chọn suất chiếu"
                : selectedShowtime.ngayChieuGioChieu
            }
          >
            {selectedShowtime.ngayChieuGioChieu === ""
              ? "Chọn suất chiếu"
              : selectedShowtime.ngayChieuGioChieu.length <= 20
              ? selectedShowtime.ngayChieuGioChieu
              : `${selectedShowtime.ngayChieuGioChieu.slice(0, 20)}...`}
          </span>
          <ion-icon name='caret-down-outline'></ion-icon>
        </div>
        {visibility && (
          <div className='options'>
            {showtimeList ? (
              <ul>
                {showtimeList.map((showtime, index) => (
                  <li
                    key={index}
                    className={selectedShowtime === showtime ? "active-option" : null}
                    onClick={() => handleGetIdBooking(showtime)}
                  >
                    {showtime.ngayChieuGioChieu}
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
