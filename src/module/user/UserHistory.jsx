import styled from "styled-components";
import moment from "moment";
import { useState, useEffect } from "react";
import { configAPI } from "apis/configAPI";
import { calculateSumMoney, commaSeparation, sortArrayDescending } from "utils/helper";
import Table from "components/table/Table";
import ActionStatus from "components/action/ActionStatus";
import ActionView from "components/action/ActionView";
import { usePagination } from "hooks/usePagination";
import Pagination from "components/pagination/Pagination";
import { path } from "constants/path";
import LoadingSpinner from "components/loading/LoadingSpinner";

const StyledUserHistory = styled.div``;

const UserHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { pagination, setPagination } = usePagination();
  const { page, limit } = pagination;
  const displayVisited = page * limit;
  const displayBookings = bookings.slice(displayVisited - limit, displayVisited);

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };
  const fetchMyBookings = async () => {
    setLoading(true);
    try {
      const { data } = await configAPI.userMyBooking();
      const sortBooking = sortArrayDescending(data.data.bookings, "id");
      setBookings(sortBooking);
      setPagination({ ...pagination, totalPages: Math.ceil(sortBooking?.length / limit) });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMyBookings();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (displayBookings.length === 0)
    return (
      <div className="container">
        <h2 style={{ textAlign: "center", color: "var(--gray-color)" }}>Empty ticket history</h2>
      </div>
    );
  return (
    <StyledUserHistory>
      <div className="container">
        <Table>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Booking Date</th>
                <th>Status</th>
                <th>Seats</th>
                <th>RoomID</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayBookings.map((booking) => (
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
                  <td>{commaSeparation(booking.tickets, "seatId")}</td>
                  <td>{booking.tickets[0].showtimeId}</td>
                  <td>{calculateSumMoney(booking.tickets, "price")}</td>
                  <td>
                    <ActionView to={`${path.bookingHistory}/${booking.id}`}></ActionView>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
    </StyledUserHistory>
  );
};

export default UserHistory;
