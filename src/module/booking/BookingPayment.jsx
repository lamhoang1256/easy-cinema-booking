import { moviesApi } from "apis/moviesApi";
import Button from "components/button/Button";
import Field from "components/field/FieldText";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Swal from "sweetalert2";
import { calculateSumMoney } from "utilities/helper";
import BookingHeading from "./BookingHeading";
import BookingTag from "./BookingTag";

const StyledBookingPayment = styled.div`
  .booking-buy {
    margin-top: 20px;
    width: 100%;
    height: 50px;
    background-color: var(--primary-color);
  }
`;

const BookingPayment = () => {
  const navigate = useNavigate();
  const { isSelecting, showtime } = useSelector((state) => state.booking);
  const isHaveSelecting = isSelecting.length > 0;

  const handleBooking = async () => {
    const values = {
      showtimeId: showtime.tickets[0].showtimeId,
      tickets: isSelecting,
    };
    if (values.tickets.length > 10) {
      return Swal.fire("Too Many Tickets!", "Maximum number of tickets is 10");
    }
    try {
      const { data } = await moviesApi.bookingAddNew(values);
      if (data?.status === "success") toast.success("Success Booking Ticket");
      navigate(`/booking-history/${data?.data?.booking?.id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <StyledBookingPayment>
      <BookingHeading>Payment Information</BookingHeading>
      <Field>
        <BookingTag className="seats">Your selecting: </BookingTag>
        <span>
          {isHaveSelecting ? isSelecting.map((seat) => seat.idDisplay + 1 + ", ") : "No thing"}
        </span>
      </Field>
      <Field>
        <BookingTag>Total Money: {calculateSumMoney(isSelecting, "price")}</BookingTag>
      </Field>
      <Button disabled={!isHaveSelecting} className="booking-buy" onClick={handleBooking}>
        BOOKING TICKET
      </Button>
    </StyledBookingPayment>
  );
};

export default BookingPayment;
