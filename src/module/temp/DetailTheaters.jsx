import Heading from "components/heading/Heading";
import HomeOpeningTimes from "module/home/HomeOpeningTimes";
import styled from "styled-components";

const StyledDetailTheaters = styled.div``;

const DetailTheaters = ({ data, date }) => {
  return (
    <StyledDetailTheaters>
      {data.map(({ tenCumRap, lichChieuPhim, maLichChieu }) => (
        <div key={maLichChieu}>
          <Heading>
            {tenCumRap} ({new Date(date).toLocaleDateString("vi-VI")})
          </Heading>
          <HomeOpeningTimes data={lichChieuPhim.slice(0, 10)} />
        </div>
      ))}
    </StyledDetailTheaters>
  );
};

export default DetailTheaters;
