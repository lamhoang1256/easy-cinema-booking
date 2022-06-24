import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { calculateSumMoney, formatVND } from "utilities/helper";
import { configAPI } from "apis/configAPI";
import ActionStatus from "components/action/ActionStatus";
import Button from "components/button/Button";
import Field from "components/field/Field";
import ImageResize from "components/image/ImageResize";
import ActionView from "components/action/ActionView";
import { path } from "constants/path";
import LoadingSpinner from "components/loading/LoadingSpinner";

const StyledBookingHistory = styled.div`
  .booking-header {
    display: flex;
    justify-content: space-between;
    background-color: #210b47;
    border-radius: 6px;
    padding: 10px 20px;
  }
  .booking-movie {
    margin-top: 20px;
    gap: 40px;
    display: flex;
    align-items: center;
  }
  .booking-info {
    flex: 1;
  }
  .booking-meta {
    display: flex;
    gap: 10px;
  }
  .booking-price {
    width: 300px;
  }
  .booking-poster {
    width: 100px;
    aspect-ratio: 2/3;
    border-radius: 6px;
  }
  .booking-main {
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
  .booking-field {
    display: flex;
    gap: 12px;
  }
`;

const BookingDetail = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [showtime, setShowtime] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchShowtimeDetail = async (id) => {
    try {
      const { data } = await configAPI.showtimeGetSingle(id);
      setShowtime(data.data.showtime);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBookingDetail = async () => {
    setLoading(true);
    try {
      const { data } = await configAPI.bookingGetSingle(id);
      const showtimeId = data.data.booking?.tickets?.[0]?.showtimeId;
      await fetchShowtimeDetail(showtimeId);
      setBooking(data.data.booking);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleCancelBooking = async () => {
    try {
      const { data } = await configAPI.bookingCancel(booking?.id);
      if (data.status === "success") toast.success("Booking cancelled successfully");
      fetchBookingDetail();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookingDetail();
  }, []);

  if (loading) return <LoadingSpinner />;
  return (
    <StyledBookingHistory>
      <div className="container">
        <h1>Booking History</h1>
        <div className="booking-header">
          <Field>
            <span>BookingID</span>
            <span>#{booking?.id}</span>
          </Field>
          <Field>
            <h3>Start time</h3>
            <span>{moment(booking?.startTime).format("LLL")}</span>
          </Field>
          <Field>
            <h3>End time</h3>
            <span>{moment(booking?.endTime).format("LLL")}</span>
          </Field>
          <Field>
            <h3>Status</h3>
            {booking.isCancelled ? (
              <ActionStatus status="cancel">Cancel</ActionStatus>
            ) : (
              <ActionStatus status="success">Success</ActionStatus>
            )}
          </Field>
          <Field>
            <h3>Total money</h3>
            <span>{calculateSumMoney(booking?.tickets, "price")}</span>
          </Field>
          <Field>
            <h3>Action</h3>
            <ActionView to={`${path.booking}/${showtime?.id}`}></ActionView>
          </Field>
        </div>
        <div className="booking-movie">
          <ImageResize
            className="booking-poster"
            url={showtime?.movie?.poster}
            width="100"
            alt="poster"
          />
          <div className="booking-info">
            <h3>{showtime?.movie?.name}</h3>
            <div className="booking-meta">
              <span>Rate: {showtime?.movie?.rating}</span>
              <span>Duration: {showtime?.movie?.duration}</span>
            </div>
          </div>
          <div className="booking-price">
            <Field>
              <span>Price</span>
              <h3>
                {booking?.tickets[0]?.price} x {booking?.tickets?.length} seats
              </h3>
            </Field>
          </div>
        </div>
        <div className="booking-main">
          <div className="booking-user">
            <h2>Your Details</h2>
            <div className="booking-field">
              <h3>Fullname:</h3>
              <span>
                {booking?.user?.firstName} {booking?.user?.lastName}
              </span>
            </div>
            <div className="booking-field">
              <h3>Email:</h3>
              <span>{booking?.user?.email}</span>
            </div>
            <div className="booking-field">
              <h3>Phone:</h3>
              <span>{booking?.user?.phoneNumber}</span>
            </div>
          </div>
          <div className="booking-detail">
            <h2>Booking Details</h2>
            <div className="booking-field">
              <h3>Quantity:</h3>
              <span>{booking?.tickets?.length}</span>
            </div>
            <div className="booking-field">
              <h3>Price:</h3>
              <span>{formatVND(booking?.tickets[0]?.price)}</span>
            </div>
            <div className="booking-field">
              <h3>Seats:</h3>
              <span>
                {booking?.tickets?.map((ticket) => (
                  <span key={ticket.seatId}>{ticket.seatId}, </span>
                ))}
              </span>
            </div>
            <div className="booking-field">
              <h3>Total:</h3>
              <span>{calculateSumMoney(booking?.tickets, "price")}</span>
            </div>
          </div>
        </div>
        {!booking.isCancelled && (
          <Button kind="purple" onClick={handleCancelBooking}>
            Cancel booking
          </Button>
        )}
      </div>
    </StyledBookingHistory>
  );
};

export default BookingDetail;
