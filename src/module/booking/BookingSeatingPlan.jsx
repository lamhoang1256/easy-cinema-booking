import TagSmall from "components/tag/TagSmall";
import { path } from "constants/path";
import { STATUS_SEAT } from "constants/styles";
import { useCountDownBooking } from "hooks/useCountDownBooking";
import { resetSelectingSeat, selectSeat } from "pages/Booking/booking.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { formatTimeTwoDigit } from "utilities/formatDate";

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
  .seatingPlan-main {
    flex: 1;
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(12, 1fr);
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
const StyleSeat = styled.button`
  width: 100%;
  aspect-ratio: 1/1;
  margin: 0 auto;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  color: var(--white);
  ${(props) => props.status && STATUS_SEAT[props.status]}
  &:disabled {
    ${STATUS_SEAT["bought"]};
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
  const checkIsSelecting = (id) => {
    const index = isSelecting.findIndex((item) => id === item.ticketId);
    return index !== -1 ? "isSelecting" : "normal";
  };
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
          <h3 className="countdown-heading">Thời gian giữ ghế :</h3>
          <p className="countdown-number">{formatTimeTwoDigit(minutes, seconds)}</p>
        </div>
        <div className="seatingPlan-example">
          <div className="field">
            <StyleSeat status="normal"></StyleSeat>
            <TagSmall kind="normal">Ghế thường</TagSmall>
          </div>
          <div className="field">
            <StyleSeat status="isSelecting"></StyleSeat>
            <TagSmall kind="normal">Ghế đang đặt</TagSmall>
          </div>
          <div className="field">
            <StyleSeat status="bought"></StyleSeat>
            <TagSmall kind="normal">Ghế đã được đặt</TagSmall>
          </div>
        </div>
      </div>
      <div className="seatingPlan-main">
        {showtime.tickets.map((ticket, index) => (
          <StyleSeat
            disabled={ticket.status}
            key={ticket.id}
            onClick={() => handleClickSeat(index, ticket)}
            status={checkIsSelecting(ticket.id)}
          >
            {index + 1}
          </StyleSeat>
        ))}
      </div>
    </StyledBookingSeatingPlan>
  );
};

export default BookingSeatingPlan;
