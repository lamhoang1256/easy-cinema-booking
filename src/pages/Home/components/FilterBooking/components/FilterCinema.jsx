import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOpendayListToSearch } from "redux/actions/movieFilter.action";
import "./filter.scss";

export const FilterCinema = () => {
  const dispatch = useDispatch();
  const { cinemaList } = useSelector((state) => state.movieFilter);
  const [visibility, setVisibility] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState({ tenCumRap: "" });

  //lấy toàn bộ các ngày có chiếu phim ở rạp đang chọn
  const handleGetOpendayList = (cinemaSelected) => {
    setSelectedCinema(cinemaSelected);
    dispatch(fetchOpendayListToSearch(cinemaSelected.lichChieuPhim));
  };

  useEffect(() => {
    setSelectedCinema({ tenCumRap: "" });
  }, [cinemaList]);

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
          <span title={selectedCinema.tenCumRap === "" ? "Chọn Rạp" : selectedCinema.tenCumRap}>
            {selectedCinema.tenCumRap === ""
              ? "Chọn Rạp"
              : selectedCinema.tenCumRap.length <= 20
              ? selectedCinema.tenCumRap
              : `${selectedCinema.tenCumRap.slice(0, 20)}...`}
          </span>
          <ion-icon name='caret-down-outline'></ion-icon>
        </div>
        {/* Danh sách RẠP đang chiếu PHIM vừa chọn */}
        {visibility && (
          <div className='filter-options'>
            {cinemaList ? (
              <ul>
                {cinemaList.heThongRapChieu.map((cinemaGroup, index) => (
                  <Fragment key={index}>
                    {cinemaGroup.cumRapChieu.map((cinema, id) => (
                      <li
                        key={id}
                        className={selectedCinema === cinema ? "active-option" : null}
                        onClick={() => handleGetOpendayList(cinema)}
                      >
                        {cinema.tenCumRap}
                      </li>
                    ))}
                  </Fragment>
                ))}
              </ul>
            ) : (
              <ul>
                <li>Vui lòng chọn phim</li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
