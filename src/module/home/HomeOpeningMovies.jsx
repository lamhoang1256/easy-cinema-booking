import styled from "styled-components";
import OpeningTimes from "./HomeOpeningTimes";

const StyledHomeOpeningMovies = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  color: var(--white);
  .poster {
    width: 120px;
    border-radius: 8px;
    aspect-ratio: 2/3;
  }
  .title {
    color: var(--white);
    font-size: 1.8rem;
  }
  @media screen and (max-width: 1023.98px) {
    flex-direction: column;
  }
`;

export const HomeOpeningMovies = ({ data }) => {
  const { hinhAnh, tenPhim, lstLichChieuTheoPhim } = data;
  return (
    <StyledHomeOpeningMovies>
      <img src={hinhAnh} alt="movie" className="poster" />
      <div>
        <h3 className="title">{tenPhim}</h3>
        <span>2D Phụ đề</span>
        <div className="openings">
          {/* Danh sách các mốc thời gian chiếu phim */}
          <OpeningTimes data={lstLichChieuTheoPhim.slice(0, 10)}></OpeningTimes>
        </div>
      </div>
    </StyledHomeOpeningMovies>
  );
};