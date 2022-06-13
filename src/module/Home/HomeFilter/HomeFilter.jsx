import styled from "styled-components";
import { useSelector } from "react-redux";
import { useMediaQuery } from "hooks/useMediaQuery";
import FilterMovie from "./FilterMovie";
import FilterCinema from "./FilterCinema";
import FilterOpenday from "./FilterOpenday";
import FilterShowtime from "./FilterShowtime";
import Button from "components/temp/Button";

const StyledHomeFilter = styled.div`
  .filter-content {
    padding-top: 40px;
    display: grid;
    grid-template-columns: 2fr 1.5fr 1.2fr 1.2fr 1fr;
    grid-gap: 20px;
    align-items: end;
    color: var(--white);
  }
  .field-label {
    display: block;
    color: #767676;
    margin-bottom: 6px;
  }
`;

const HomeFilter = () => {
  const { idTicketRoom } = useSelector((state) => state.movieFilter);
  const isFilterVisible = useMediaQuery("(min-width:1200px)");

  return (
    <StyledHomeFilter>
      {isFilterVisible && (
        <div className="container">
          <div className="filter-content">
            <div className="field">
              <span className="field-label">Chọn phim</span>
              <FilterMovie />
            </div>
            <div className="field">
              <span className="field-label">Chọn rạp chiếu</span>
              <FilterCinema />
            </div>
            <div className="field">
              <span className="field-label">Chọn ngày xem</span>
              <FilterOpenday />
            </div>
            <div className="field">
              <span className="field-label">Chọn suất chiếu</span>
              <FilterShowtime />
            </div>
            <div className="field">
              {idTicketRoom ? (
                <Button to={`/booking/${idTicketRoom}`} kind="primary" height="56">
                  Đặt vé
                </Button>
              ) : (
                <Button height="56">Đặt vé</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </StyledHomeFilter>
  );
};

export default HomeFilter;
