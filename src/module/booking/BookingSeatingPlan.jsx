import { moviesApi } from "apis/moviesApi";
import Button from "components/button/Button";
import TagSmall from "components/tag/TagSmall";
import { selectSeat } from "pages/Booking/booking.slice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { toast } from "react-toastify";
import { STATUS_SEAT } from "constants/styles";

const StyledBookingSeatingPlan = styled.div`
  .field {
    gap: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .seatingPlan-main {
    max-width: 600px;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(10, 1fr);
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

const BookingSeatingPlan = ({ tickets }) => {
  const dispatch = useDispatch();
  const { isSelecting } = useSelector((state) => state.booking);

  const checkIsSelecting = (id) => {
    const index = isSelecting.findIndex((item) => id === item.ticketId);
    return index !== -1 ? "isSelecting" : "normal";
  };
  const handleClickSeat = (seat) => {
    dispatch(selectSeat(seat));
  };
  const handleBooking = async () => {
    const values = {
      showtimeId: tickets[0].showtimeId,
      tickets: isSelecting,
    };
    try {
      const { data } = await moviesApi.bookingAddNew(values);
      if (data?.status === "success") toast.success("Success Booking Ticket");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <StyledBookingSeatingPlan>
      <div className="seatingPlan-main">
        {tickets.map((ticket, index) => (
          <StyleSeat
            disabled={ticket.status}
            key={ticket.id}
            onClick={() => handleClickSeat(ticket)}
            status={checkIsSelecting(ticket.id)}
          >
            {index + 1}
          </StyleSeat>
        ))}
      </div>
      <Button onClick={handleBooking}>Buy ticket</Button>
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
    </StyledBookingSeatingPlan>
  );
};

export default BookingSeatingPlan;
