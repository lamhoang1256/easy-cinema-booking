import { useEffect } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TagSmall from "components/tag/TagSmall";
import { path } from "constants/path";
import { useCountDownBooking } from "hooks/useCountDownBooking";
import { resetSelectingSeat, selectSeat } from "pages/Booking/booking.slice";
import { useDispatch, useSelector } from "react-redux";
import { formatTimeTwoDigit } from "utils/formatDate";
import BookingSeating, { StyledSeat } from "./BookingSeating";

const StyledBookingSeatingPlan = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px 40px;
  .field {
    gap: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .seatingPlan-introduction {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .seatingPlan-introduction button {
    width: 40px;
    height: 40px;
    border: 0;
  }
  .countdown-heading,
  .countdown-number {
    text-align: center;
    color: var(--white);
  }
  @media screen and (max-width: 767.98px) {
    flex-direction: column;
    .seatingPlan-main {
      grid-template-columns: repeat(8, 1fr);
    }
    .seatingPlan-example {
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
    }
    .seatingPlan-example span {
      font-size: 1.2rem;
    }
  }
`;

const COUNTDOWN_MINUTES = 5;
const COUNTDOWN_SECONDS = 0;
const BookingSeatingPlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSelecting, showtime } = useSelector((state) => state.booking);
  const { handleResetCountdown, minutes, seconds } = useCountDownBooking(
    COUNTDOWN_MINUTES,
    COUNTDOWN_SECONDS
  );
  const handleClickSeat = (index, userSelected) => {
    dispatch(selectSeat({ idDisplay: index, userSelected }));
  };

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      Swal.fire({
        icon: "warning",
        title: "Time out",
        text: "Tickets hold time to expire!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Return home",
        confirmButtonText: "Continue booking",
      }).then((result) => {
        if (result.isDismissed) {
          navigate(path.home);
        }
        if (result.isConfirmed) {
          Swal.fire(
            "Start counting!",
            `Ticket holding time is ${formatTimeTwoDigit(COUNTDOWN_MINUTES, COUNTDOWN_SECONDS)}`
          );
          dispatch(resetSelectingSeat());
          handleResetCountdown();
        }
      });
    }
  }, [seconds]);

  return (
    <StyledBookingSeatingPlan>
      <div className="seatingPlan-introduction">
        <div className="countdown">
          <h3 className="countdown-heading">Seat Holding Time:</h3>
          <p className="countdown-number">{formatTimeTwoDigit(minutes, seconds)}</p>
        </div>
        <div className="seatingPlan-example">
          <div className="field">
            <StyledSeat status="normal"></StyledSeat>
            <TagSmall kind="normal">Seats normal</TagSmall>
          </div>
          <div className="field">
            <StyledSeat status="isSelecting"></StyledSeat>
            <TagSmall kind="normal">Seats are booking</TagSmall>
          </div>
          <div className="field">
            <StyledSeat status="bought"></StyledSeat>
            <TagSmall kind="normal">Seats are booked</TagSmall>
          </div>
        </div>
      </div>
      <BookingSeating
        seats={showtime.tickets}
        isSelecting={isSelecting}
        onClickSeat={handleClickSeat}
      />
    </StyledBookingSeatingPlan>
  );
};

export default BookingSeatingPlan;
