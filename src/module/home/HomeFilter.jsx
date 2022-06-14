import styled from "styled-components";
import { useSelector } from "react-redux";
import { useMediaQuery } from "hooks/useMediaQuery";
import FilterMovie from "./FilterMovie";
import FilterCinema from "./FilterCinema";
import FilterOpenday from "./FilterOpenday";
import FilterShowtime from "./FilterShowtime";
import Button from "components/button/Button";

const StyledHomeFilter = styled.div`
  .filter-content {
    padding-top: 40px;
    display: grid;
    grid-template-columns: 2fr 1.5fr 1.2fr 1.2fr 1fr;
    grid-gap: 20px;
    align-items: end;
    color: var(--white);
  }
  .filter-buy button {
    width: 100%;
  }
  .label {
    display: block;
    color: #767676;
    margin-bottom: 6px;
  }
`;

const HomeFilter = () => {
  const { idTicketRoom } = useSelector((state) => state.movieFilter);
  const isVisible = useMediaQuery("(min-width:1200px)");

  return (
    <StyledHomeFilter>
      {isVisible && (
        <div className="container">
          <div className="filter-content">
            <FilterMovie />
            <FilterCinema />
            <FilterOpenday />
            <FilterShowtime />
            <div className="filter-buy">
              {idTicketRoom && (
                <Button to={`/booking/${idTicketRoom}`} kind="primary" height="56">
                  Đặt vé
                </Button>
              )}
              {!idTicketRoom && <Button height="56">Đặt vé</Button>}
            </div>
          </div>
        </div>
      )}
    </StyledHomeFilter>
  );
};

export default HomeFilter;
