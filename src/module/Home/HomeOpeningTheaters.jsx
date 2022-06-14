import styled from "styled-components";
import { HomeOpeningMovies } from "./HomeOpeningMovies";

const StyledHomeOpeningTheaters = styled.div`
  height: 54rem;
  overflow-y: auto;
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
  .opening-header {
    padding: 20px;
    background-color: #fafafa;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  .time-button {
    font-size: 1.4rem;
    padding: 0 8px;
  }
`;

const HomeOpeningTheaters = ({ data }) => {
  const { tenCumRap, diaChi, danhSachPhim } = data;
  return (
    <StyledHomeOpeningTheaters>
      <div className="opening-header">
        <h3>Lịch chiếu phim {tenCumRap}</h3>
        <span>Địa chỉ: {diaChi}</span>
      </div>
      {/* Danh sách phim đang chiếu của rạp */}
      {danhSachPhim.map((movies) => (
        <HomeOpeningMovies data={movies} />
      ))}
    </StyledHomeOpeningTheaters>
  );
};

export default HomeOpeningTheaters;
