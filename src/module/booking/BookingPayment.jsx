import { configAPI } from "apis/configAPI";
import styled from "styled-components";
import Swal from "sweetalert2";
import { path } from "constants/path";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { calculateSumMoney, scrollTop } from "utils/helper";
import Button from "components/button/Button";
import Field from "components/field/FieldText";
import BookingHeading from "./BookingHeading";
import BookingTag from "./BookingTag";
import { resetSelectingSeat } from "pages/Booking/booking.slice";
import { useEffect } from "react";

const StyledBookingPayment = styled.div`
  .booking-buy {
    margin-top: 20px;
    width: 100%;
    height: 50px;
    background-color: var(--primary-color);
  }
`;
const commaSeparationSeat = (array, key) => {
  const count = array.length - 1;
  return array.map((item, index) => {
    if (index === count) return <span key={index}>{item[key] + 1}</span>;
    return <span key={index}>{item[key] + 1 + ", "}</span>;
  });
};

const BookingPayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      const { data } = await configAPI.bookingAddNew(values);
      if (data?.status === "success") toast.success("Booking Ticket successfully");
      dispatch(resetSelectingSeat());
      navigate(`${path.bookingHistory}/${data?.data?.booking?.id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <StyledBookingPayment>
      <BookingHeading>Payment Information</BookingHeading>
      <Field>
        <BookingTag className="seats">Your selecting: </BookingTag>
        <span>{isHaveSelecting ? commaSeparationSeat(isSelecting, "idDisplay") : "No thing"}</span>
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
