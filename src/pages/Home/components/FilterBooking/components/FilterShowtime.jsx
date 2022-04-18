import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdToBooking } from "redux/actions/movieFilter.action";
import "./filter.scss";

export const FilterShowtime = () => {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  const [selectedShowtime, setSelectedShowtime] = useState({ ngayChieuGioChieu: "" });
  const { showtimeList } = useSelector((state) => state.movieFilter);

  // lấy id phòng chiếu để chuyển sang đặt vé
  const handleGetIdBooking = (showtimeSelected) => {
    setSelectedShowtime(showtimeSelected);
    dispatch(getIdToBooking(showtimeSelected.maLichChieu));
  };

  useEffect(() => {
    setSelectedShowtime({ ngayChieuGioChieu: "" });
  }, [showtimeList]);

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
        {/* Danh sách các SUẤT CHIẾU có trong NGÀY ở RẠP vừa chọn */}
        {visibility && (
          <div className='filter-options'>
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
