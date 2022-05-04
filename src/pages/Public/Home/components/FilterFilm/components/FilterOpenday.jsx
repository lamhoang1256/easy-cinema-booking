import { useEffect, useState } from "react";
import Filter from "components/Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { fetchShowtimeListToSearch } from "redux/actions/movie/movieFilter.action";
import { formatISOtoLocaleDateString, formatLocaleDateString } from "utilities/formatDate";

const FilterOpenday = () => {
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
    <Filter
      onChange={handleGetShowtimeList}
      labelNotSelectItem='Chọn Ngày'
      selectedTitle={formatLocaleDateString(selectedOpenday.ngayChieuGioChieu)}
      selectedItem={selectedOpenday.ngayChieuGioChieu}
    >
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
    </Filter>
  );
};

export default FilterOpenday;
