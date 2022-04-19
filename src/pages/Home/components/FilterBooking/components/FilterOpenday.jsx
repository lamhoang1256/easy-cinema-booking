import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShowtimeListToSearch } from "redux/actions/movie/movieFilter.action";
import { formatISOtoLocaleDateString } from "utilities/formatDate";
import "./filter.scss";

export const FilterOpenday = () => {
  const dispatch = useDispatch();
  const { opendayList } = useSelector((state) => state.movieFilter);
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

  // lấy danh sách các suất chiếu có trong ngày vừa được chọn
  const handleGetShowtimeList = (opendaySelected) => {
    setSelectedOpenday(opendaySelected);
    dispatch(fetchShowtimeListToSearch(opendaySelected));
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
                ? "Chọn Ngày"
                : selectedOpenday.ngayChieuGioChieu
            }
          >
            {selectedOpenday.ngayChieuGioChieu === ""
              ? "Chọn Ngày"
              : formatISOtoLocaleDateString(selectedOpenday.ngayChieuGioChieu)}
          </span>
          <ion-icon name='caret-down-outline'></ion-icon>
        </div>
        {/* Danh sách các NGÀY đang chiếu PHIM ở RẠP vừa chọn */}
        {visibility && (
          <div className='filter-options'>
            {uniqueOpendayList ? (
              <ul>
                {uniqueOpendayList.map((openday, index) => (
                  <li
                    key={index}
                    className={selectedOpenday === openday ? "active-option" : null}
                    onClick={() => handleGetShowtimeList(openday)}
                  >
                    {formatISOtoLocaleDateString(openday.ngayChieuGioChieu)}
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
