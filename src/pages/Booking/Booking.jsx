import Section from "components/section/Section";
import Tag from "components/tag/Tag";
import TicketRoomDetail from "module/ticket-room/TicketRoomDetail";
import SeatingPlan from "module/TicketRoom/SeatingPlan";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchShowtime } from "./booking.slice";

const StyledBooking = styled.div`
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
  const { loading, showtime } = useSelector((state) => state.booking);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShowtime(id));
  }, [id, dispatch]);

  if (loading) return "Loading";

  return (
    <StyledBooking>
      <div className="container">
        <div className="grid-layout">
          {/* Planing map seat */}
          <div className="column1">
            <Section>
              <div className="ticketRoom-countdown">
                <Tag kind="gray">Thời gian giữ ghế :</Tag>{" "}
                {/* <Tag kind="primary">{formatTimeTwoDigit(minutes, seconds)}</Tag> */}
              </div>
              <div className="ticketRoom-screen">Màn hình</div>
              <SeatingPlan tickets={showtime.tickets} />
            </Section>
          </div>
          {/* Information movie, user, bill, total money... */}
          <div className="column2">
            <TicketRoomDetail movie={showtime.movie}></TicketRoomDetail>
            {/* <BookingUser data={userInfo}></BookingUser>
                <Section>
                  <Heading kind="secondary">Tổng tiền: {totalMoney} VNĐ</Heading>
                  <Button kind="purple" className="btn-buy" onClick={handleBuyTicket}>
                    Đặt vé
                  </Button>
                </Section> */}
          </div>
        </div>
      </div>
    </StyledBooking>
  );
};

export default Booking;
