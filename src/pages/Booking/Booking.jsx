import Section from "components/section/Section";
import BookingMovie from "module/booking/BookingMovie";
import BookingProfile from "module/booking/BookingProfile";
import BookingSeatingPlan from "module/booking/BookingSeatingPlan";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchShowtime } from "./booking.slice";
import BookingPayment from "module/booking/BookingPayment";

const StyledBooking = styled.div`
  .column1 {
    margin-right: 40px;
  }
  .ticketRoom-countdown {
    text-align: center;
  }
  .ticketRoom-time,
  .ticketRoom-price {
    color: var(--primary-color);
  }
  .ticketRoom-screen {
    margin-top: 10px;
    padding: 2px 0;
    text-align: center;
    background-color: var(--gray-color);
    color: var(--primary-color);
    border-radius: 50% 50% 0 0;
  }
  .ticketRoom-boxed {
    display: flex;
    gap: 20px;
  }
  .btn-buy {
    margin-top: 10px;
    width: 100%;
  }
`;

const Booking = () => {
  const { id } = useParams();
  const { loading, showtime } = useSelector((state) => state.booking);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShowtime(id));
  }, [id, dispatch]);

  if (loading) return "Loading";
  return (
    <StyledBooking>
      <div className="container">
        <div className="grid-layout">
          <Section className="column1">
            {/* <BookingTag kind="primary">{formatTimeTwoDigit(minutes, seconds)}</BookingTag> */}
            <BookingSeatingPlan tickets={showtime.tickets} />
          </Section>

          <div className="column2">
            <BookingMovie movie={showtime.movie}></BookingMovie>
            <BookingProfile></BookingProfile>
            <BookingPayment />
          </div>
        </div>
      </div>
    </StyledBooking>
  );
};

export default Booking;
