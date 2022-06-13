import { useEffect, useState } from "react";
import Filter from "components/Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { fetchShowtimeListToSearch } from "redux/actions/movieFilter.action";
import { formatISOtoLocaleDateString, formatLocaleDateString } from "utilities/formatDate";

const FilterOpenday = () => {
  const dispatch = useDispatch();
  const { opendayList } = useSelector((state) => state.movieFilter);
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
    <Filter
      onChange={handleGetShowtimeList}
      labelNotSelect="Chọn Ngày"
      selectedTitle={formatLocaleDateString(selectedOpenday.ngayChieuGioChieu)}
      title={selectedOpenday.ngayChieuGioChieu}
    >
      {uniqueOpendayList?.map((openday, index) => {
        const isActive = selectedOpenday === openday ? "active-option" : null;
        return (
          <li key={index} className={isActive} onClick={() => handleGetShowtimeList(openday)}>
            {formatISOtoLocaleDateString(openday.ngayChieuGioChieu)}
          </li>
        );
      })}
    </Filter>
  );
};

export default FilterOpenday;
