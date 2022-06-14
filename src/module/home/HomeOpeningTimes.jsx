import Button from "components/button/Button";
import { formatDateToHours } from "utilities/formatDate";
import { increaseTime } from "utilities/increaseTime";
import styled from "styled-components";

const StyledHomeOpeningTimes = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 600px;
  gap: 10px;
  padding: 8px 0;
  .time-button {
    font-size: 1.4rem;
    padding: 0 8px;
  }
`;

const TWO_HOURS_TO_SECONDS = 7200000;
const HomeOpeningTimes = ({ data }) => {
  return (
    <StyledHomeOpeningTimes>
      {data.map(({ maLichChieu, ngayChieuGioChieu }) => (
        <Button
          to={`/booking/${maLichChieu}`}
          className="time-button"
          height="36"
          kind="purple"
          key={maLichChieu}
        >
          {formatDateToHours(ngayChieuGioChieu)}
          <span> ~ </span>
          {formatDateToHours(increaseTime(ngayChieuGioChieu, TWO_HOURS_TO_SECONDS))}
        </Button>
      ))}
    </StyledHomeOpeningTimes>
  );
};

export default HomeOpeningTimes;
