import Button from "components/button/Button";
import { formatDateToHours } from "utilities/formatDate";
import { increaseTime } from "utilities/increaseTime";

const TWO_HOURS_TO_SECONDS = 7200000;
const HomeOpeningTimes = ({ data }) => {
  const { maLichChieu, ngayChieuGioChieu } = data;
  return (
    <Button to={`/booking/${maLichChieu}`} className="time-button" height="36" kind="purple">
      {formatDateToHours(ngayChieuGioChieu)}
      <span> ~ </span>
      {formatDateToHours(increaseTime(ngayChieuGioChieu, TWO_HOURS_TO_SECONDS))}
    </Button>
  );
};

export default HomeOpeningTimes;
