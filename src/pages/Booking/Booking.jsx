import Section from "components/section/Section";
import BookingMovie from "module/booking/BookingMovie";
import BookingProfile from "module/booking/BookingProfile";
import BookingSeatingPlan from "module/booking/BookingSeatingPlan";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchShowtime, resetSelectingSeat } from "./booking.slice";
import BookingPayment from "module/booking/BookingPayment";
import LoadingSpinner from "components/loading/LoadingSpinner";

const StyledBooking = styled.div`
  .column1 {
    margin-right: 40px;
  }
  .column2 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  const { loading } = useSelector((state) => state.booking);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShowtime(id));
    dispatch(resetSelectingSeat());
  }, [id, dispatch]);

  if (loading) return <LoadingSpinner />;
  return (
    <StyledBooking>
      <div className="container">
        <div className="grid-layout">
          <Section className="column1">
            <BookingSeatingPlan />
          </Section>
          <div className="column2">
            <BookingMovie />
            <BookingProfile />
            <BookingPayment />
          </div>
        </div>
      </div>
    </StyledBooking>
  );
};

export default Booking;
