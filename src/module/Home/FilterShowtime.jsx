import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filter from "components/Filter/Filter";
import { getIdToBooking } from "redux/actions/movie/movieFilter.action";
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
      labelNotSelectItem='Chọn suất chiếu'
      selectedItem={selectedShowtime.ngayChieuGioChieu}
      selectedTitle={formatISOtoHours(selectedShowtime.ngayChieuGioChieu)}
    >
      {showtimeList ? (
        <ul>
          {showtimeList.map((showtime, index) => (
            <li
              key={index}
              className={selectedShowtime === showtime ? "active-option" : null}
              onClick={() => handleGetIdBooking(showtime)}
            >
              {formatISOtoHours(showtime.ngayChieuGioChieu)}
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          <li>Vui lòng chọn ngày</li>
        </ul>
      )}
    </Filter>
  );
};

export default FilterShowtime;
