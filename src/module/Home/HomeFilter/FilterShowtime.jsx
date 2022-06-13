import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filter from "components/Filter/Filter";
import { getIdToBooking } from "redux/actions/movieFilter.action";
import { formatISOtoHours } from "utilities/formatDate";

const FilterShowtime = () => {
  const dispatch = useDispatch();
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
    <Filter
      onChange={handleGetIdBooking}
      labelNotSelect="Chọn suất chiếu"
      title={selectedShowtime.ngayChieuGioChieu}
      selectedTitle={formatISOtoHours(selectedShowtime.ngayChieuGioChieu)}
    >
      {showtimeList?.map((showtime, index) => {
        const isActive = selectedShowtime === showtime ? "active-option" : null;
        return (
          <li key={index} className={isActive} onClick={() => handleGetIdBooking(showtime)}>
            {formatISOtoHours(showtime.ngayChieuGioChieu)}
          </li>
        );
      })}
    </Filter>
  );
};

export default FilterShowtime;
