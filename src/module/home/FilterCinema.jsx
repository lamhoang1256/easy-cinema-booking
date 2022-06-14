import { Fragment, useState, useEffect } from "react";
import Filter from "components/Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { fetchOpendayListToSearch } from "redux/actions/movieFilter.action";

const FilterCinema = () => {
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
      labelNotSelect="Chọn Rạp"
      title={selectedCinema.tenCumRap}
    >
      {cinemaList?.heThongRapChieu.map((cinemaGroup, index) => (
        <Fragment key={index}>
          {cinemaGroup.cumRapChieu.map((cinema, id) => {
            const isActive = selectedCinema === cinema ? "active-option" : null;
            return (
              <li key={id} className={isActive} onClick={() => handleGetOpendayList(cinema)}>
                {cinema.tenCumRap}
              </li>
            );
          })}
        </Fragment>
      ))}
    </Filter>
  );
};

export default FilterCinema;
