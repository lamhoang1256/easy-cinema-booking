import styled from "styled-components";
import { HomeShowtimes } from "./HomeShowtimes";

const StyledHomeScreens = styled.div`
  height: 54rem;
  overflow-y: auto;
  .cinema {
    margin-bottom: 30px;
  }
  .cinema-title {
    font-size: 2rem;
    margin-bottom: 10px;
  }
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 8px;
  }
`;

const HomeScreens = ({ cinemas }) => {
  return (
    <StyledHomeScreens>
      {/* Render danh sách các phòng chiếu phim của rạp */}
      {cinemas?.map((cinema) => (
        <div className="cinema" key={cinema.id}>
          <h3 className="cinema-title">Lịch chiếu phim {cinema?.name}</h3>
          <HomeShowtimes showtimes={cinema?.showtimes} />
        </div>
      ))}
    </StyledHomeScreens>
  );
};

export default HomeScreens;
