import { moviesApi } from "apis/moviesApi";
import Button from "components/button/Button";
import Field from "components/field/FieldText";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { calculateSumMoney } from "utilities/helper";
import BookingHeading from "./BookingHeading";
import BookingTag from "./BookingTag";

const StyledBookingPayment = styled.div``;

const BookingPayment = () => {
  const { isSelecting, showtime } = useSelector((state) => state.booking);

  const handleBooking = async () => {
    const values = {
      showtimeId: showtime.tickets[0].showtimeId,
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
    <StyledBookingPayment>
      <BookingHeading>Payment Information</BookingHeading>
      <Field>
        <BookingTag className="seats">Your selecting: </BookingTag>
        <span>
          {isSelecting.length > 0
            ? isSelecting.map((seat) => seat.idDisplay + 1 + ", ")
            : "No thing"}
        </span>
      </Field>
      <Field>
        <BookingTag>Total Money: {calculateSumMoney(isSelecting, "price")}</BookingTag>
      </Field>
      <Button onClick={handleBooking}>Buy ticket</Button>
    </StyledBookingPayment>
  );
};

export default BookingPayment;
