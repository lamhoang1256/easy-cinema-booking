import { configAPI } from "apis/configAPI";
import Button from "components/button/Button";
import LoadingSpinner from "components/loading/LoadingSpinner";
import { path } from "constants/path";
import BookingSeating from "module/booking/BookingSeating";
import MovieViewDetail from "module/movie/MovieViewDetail";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { formatVND } from "utils/helper";

const StyledShowtimeView = styled.div`
  .screen {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
  }
  .screen-meta {
    flex-shrink: 0;
    width: 400px;
  }
  .screen-meta h3 {
    margin-bottom: 10px;
  }
  .screen-seating {
    flex: 1;
    max-width: 600px;
  }
`;

const ShowtimeView = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [showtime, setShowtime] = useState([]);
  const fetchShowtimeNeedUpdate = async () => {
    setLoading(true);
    try {
      const { data } = await configAPI.showtimeGetSingle(id);
      setShowtime(data.data.showtime);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchShowtimeNeedUpdate();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  const totalTicketSales = showtime?.tickets.reduce(function (acc, next) {
    if (next.status === true) return acc + next.price;
    return acc;
  }, 0);

  return (
    <StyledShowtimeView>
      <MovieViewDetail data={showtime.movie} />
      <div className="screen">
        <div className="screen-seating">
          <BookingSeating seats={showtime.tickets}></BookingSeating>
        </div>
        <div className="screen-meta">
          <h3>Cinema: {showtime.screen.name}</h3>
          <h3>Price ticket: {formatVND(showtime.tickets[0].price)}</h3>
          <h3>Total ticket sales: {formatVND(totalTicketSales)}</h3>
          <Button to={`${path.booking}/${showtime.id}`} kind="purple">
            Redirect to Ticket Room Page
          </Button>
        </div>
      </div>
    </StyledShowtimeView>
  );
};

export default ShowtimeView;
