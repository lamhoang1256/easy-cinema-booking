import { Filter } from "components/Filter/Filter";
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOpendayListToSearch } from "redux/actions/movie/movieFilter.action";

export const FilterCinema = () => {
  const dispatch = useDispatch();
  const { cinemaList } = useSelector((state) => state.movieFilter);
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
    <Filter
      onChange={handleGetOpendayList}
      labelNotSelectItem='Chọn Rạp'
      selectedItem={selectedCinema.tenCumRap}
    >
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
    </Filter>
  );
};
