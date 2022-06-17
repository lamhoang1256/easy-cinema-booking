import { moviesApi } from "apis/moviesApi";
import Button from "components/button/Button";
import TagSmall from "components/tag/TagSmall";
import { useState } from "react";
import styled, { css } from "styled-components";

const STATUS_SEAT = {
  normal: css`
    background-color: #9692c7;
  `,
  isSelecting: css`
    background-color: #2fdd92;
  `,
  bought: css`
    background-color: #ff0000;
  `,
};

const StyledSeatingPlan = styled.div`
  .field {
    gap: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyleSeat = styled.button`
  width: 40px;
  height: 40px;
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

const SeatingPlan = ({ tickets }) => {
  const [selecting, setSelecting] = useState([]);
  const checkIsSelecting = (id) => {
    const index = selecting.findIndex((item) => id === item.ticketId);
    return index !== -1 ? "isSelecting" : "normal";
  };

  const handleToggleClickSeat = (id) => {
    const index = selecting.findIndex((item) => id === item.ticketId);
    if (index === -1) {
      setSelecting([...selecting, { ticketId: id }]);
    } else {
      let cloneSelecting = [...selecting];
      cloneSelecting.splice(index, 1);
      setSelecting(cloneSelecting);
    }
  };

  const handleBooking = async () => {
    console.log(selecting);
    const values = {
      showtimeId: tickets[0].showtimeId,
      tickets: selecting,
    };
    try {
      const { data } = await moviesApi.bookingAddNew(values);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledSeatingPlan>
      <div className="seating-plan">
        <div className="seating-plan-container">
          {tickets.map((ticket, index) => (
            <StyleSeat
              disabled={ticket.status}
              key={ticket.id}
              onClick={() => handleToggleClickSeat(ticket.id)}
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
      </div>
    </StyledSeatingPlan>
  );
};

export default SeatingPlan;
