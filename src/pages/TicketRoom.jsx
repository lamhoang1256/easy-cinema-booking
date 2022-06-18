import { useParams } from "react-router-dom";
// component
// utilities
import Section from "components/section/Section";
import Tag from "components/tag/Tag";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { moviesApi } from "apis/moviesApi";
import SeatingPlan from "module/TicketRoom/SeatingPlan";
import TicketRoomDetail from "module/booking/BookingMovie";

const StyledTicketRoom = styled.div`
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

const TicketRoom = () => {
  const { idTicketRoom } = useParams();
  const [loading, setLoading] = useState(true);
  const [showtime, setShowtime] = useState([]);

  const fetchShowtime = async () => {
    setLoading(true);
    try {
      const { data } = await moviesApi.showtimeGetSingle(idTicketRoom);
      console.log(data.data.showtime);
      setShowtime(data.data.showtime);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchShowtime();
  }, [idTicketRoom]);

  if (loading) return "Loading";

  return (
    <StyledTicketRoom>
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
            {/* <TicketRoomUser data={userInfo}></TicketRoomUser>
                <Section>
                  <Heading kind="secondary">Tổng tiền: {totalMoney} VNĐ</Heading>
                  <Button kind="purple" className="btn-buy" onClick={handleBuyTicket}>
                    Đặt vé
                  </Button>
                </Section> */}
          </div>
        </div>
      </div>
    </StyledTicketRoom>
  );
};

export default TicketRoom;
