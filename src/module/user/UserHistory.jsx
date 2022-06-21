import styled from "styled-components";
import moment from "moment";
import { useState, useEffect } from "react";
import { usersApi } from "apis/usersApi";
import { calculateSumMoney } from "utilities/helper";
import Table from "components/table/Table";
import ActionStatus from "components/action/ActionStatus";
import ActionView from "components/action/ActionView";

const StyledUserHistory = styled.div``;

const UserHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchMyBookings = async () => {
    setLoading(true);
    try {
      const { data } = await usersApi.userMyBooking();
      setBookings(data.data.bookings);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMyBookings();
  }, []);

  if (loading) return "Loading";
  return (
    <StyledUserHistory>
      <div className="container">
        <Table>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Ngày đặt</th>
                <th>Status</th>
                <th>Seat</th>
                <th>Showtime ID</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{moment(booking.createdAt).format("LLL")}</td>
                  <td>
                    {booking.isCancelled ? (
                      <ActionStatus status="cancel">Cancel</ActionStatus>
                    ) : (
                      <ActionStatus status="success">Success</ActionStatus>
                    )}
                  </td>
                  <td>
                    {booking.tickets.map((ticket) => (
                      <span>{ticket.seatId}, </span>
                    ))}
                  </td>
                  <td>{booking.tickets[0].showtimeId}</td>
                  <td>{calculateSumMoney(booking.tickets, "price")}</td>
                  <td>
                    <ActionView to={`/booking-history/${booking.id}`}></ActionView>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </div>
    </StyledUserHistory>
  );
};

export default UserHistory;
