import { moviesApi } from "apis/moviesApi";
import BookingSeating from "module/booking/BookingSeating";
import MovieViewDetail from "module/movie/MovieViewDetail";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { formatVND } from "utilities/helper";

const StyledShowtimeView = styled.div`
  .screen {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
  }
  .screen-meta {
    flex-shrink: 0;
    width: 220px;
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
      const { data } = await moviesApi.showtimeGetSingle(id);
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

  if (loading) return "Loading";
  const totalTicketSales = showtime?.tickets.reduce(function (acc, next) {
    if (next.status === true) return acc + next.price;
    return acc;
  }, 0);

  return (
    <StyledShowtimeView>
      <MovieViewDetail data={showtime.movie} />
      <div className="screen">
        <div className="screen-meta">
          <h3>{showtime.screen.name}</h3>
          <p>ScreenId: {showtime.screen.id}</p>
          <p>Price: {formatVND(showtime.tickets[0].price)}</p>
          <h3>
            Total ticket sales: <h4>{formatVND(totalTicketSales)}</h4>
          </h3>
        </div>
        <div className="screen-seating">
          <BookingSeating seats={showtime.tickets}></BookingSeating>
        </div>
      </div>
    </StyledShowtimeView>
  );
};

export default ShowtimeView;
