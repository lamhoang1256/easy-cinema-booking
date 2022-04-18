import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShowtimeListToSearch } from "redux/actions/movieSearch.action";
import "./filter.scss";

export const FilterOpenday = () => {
  const dispatch = useDispatch();
  const { opendayList } = useSelector((state) => state.movieSearch);
  const [visibility, setVisibility] = useState(false);
  const [selectedOpenday, setSelectedOpenday] = useState({ ngayChieuGioChieu: "" });

  // tạo mảng ngày không bị trùng lặp
  let uniqueOpendayList = opendayList?.reduce((previousValue, current) => {
    if (
      !previousValue.some(function (x) {
        const time = x.ngayChieuGioChieu.split("T")[0];
        const currentTime = current.ngayChieuGioChieu.split("T")[0];
        return time === currentTime;
      })
    ) {
      previousValue.push(current);
    }
    return previousValue;
  }, []);

  const handleGetShowtimeList = (openday) => {
    setSelectedOpenday(openday);
    dispatch(fetchShowtimeListToSearch(openday));
  };

  useEffect(() => {
    setSelectedOpenday({ ngayChieuGioChieu: "" });
  }, [opendayList]);

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
              selectedOpenday.ngayChieuGioChieu === ""
                ? "Chọn ngày"
                : selectedOpenday.ngayChieuGioChieu
            }
          >
            {selectedOpenday.ngayChieuGioChieu === ""
              ? "Chọn ngày"
              : selectedOpenday.ngayChieuGioChieu.length <= 20
              ? selectedOpenday.ngayChieuGioChieu
              : `${selectedOpenday.ngayChieuGioChieu.slice(0, 20)}...`}
          </span>
          <ion-icon name='caret-down-outline'></ion-icon>
        </div>
        {visibility && (
          <div className='filter-options'>
            {uniqueOpendayList ? (
              <ul>
                {uniqueOpendayList.map((openday, index) => (
                  <li
                    key={index}
                    className={selectedOpenday === openday ? "filter-active-option" : null}
                    onClick={() => handleGetShowtimeList(openday)}
                  >
                    {new Date(openday.ngayChieuGioChieu.split("T")[0]).toLocaleDateString("vi-VI")}
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
