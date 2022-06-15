import Tag from "components/tag/Tag";
import TagSmall from "components/tag/TagSmall";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { selectSeat } from "redux/actions/ticketRoom.action";
import styled, { css } from "styled-components";

const STATUS_SEAT = {
  selecting: css`
    background-color: #2fdd92;
  `,
  bought: css`
    background-color: #ff0000;
  `,
  your: css`
    background-color: #bfbfbf;
  `,
  vip: css`
    background-color: var(--secondary-color);
  `,
};

const StyleSeat = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 auto;
  background-color: #9692c7;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  color: var(--white);
  ${(props) => props.status && STATUS_SEAT[props.status]}
`;

const imgMultiply = `${process.env.REACT_APP_PUBLIC}/assets/images/chore/seat-multiply.png`;
const imgYourChoice = `${process.env.REACT_APP_PUBLIC}/assets/images/chore/seat-your-choice.png`;

const SeatingPlan = ({ danhSachGhe, selectingSeatList }) => {
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const handleSelectSeat = (seat) => {
    dispatch(selectSeat(seat));
  };

  return (
    <div className="seating-plan">
      <div className="seating-plan-container">
        {danhSachGhe.map((seat, index) => {
          const baseSeat = "seating-plan-seat";
          const isVip = seat.loaiGhe === "Vip";
          const isBought = seat.daDat;
          const isYouBought = seat.taiKhoanNguoiDat === userInfo?.taiKhoan;
          const isSelecting = selectingSeatList?.findIndex((c) => c.maGhe === seat.maGhe);

          const vip = isVip ? `${baseSeat}--vip` : "";
          const bought = isBought ? `${baseSeat}--bought` : "";
          const youBought = isYouBought ? `${baseSeat}--youBought` : "";
          const selecting = isSelecting === -1 ? "" : `${baseSeat}--selecting`;

          return (
            <button
              disabled={bought !== "" ? true : false}
              className={`${baseSeat} ${bought} ${vip} ${selecting} ${youBought}`}
              onClick={() => handleSelectSeat(seat)}
              key={index}
            >
              {bought !== "" && !isYouBought && <img src={imgMultiply} alt="multiply" />}
              {bought && isYouBought && (
                <img src={imgYourChoice} alt="youBought" className="seating-plan-youBought" />
              )}
              {!bought && seat.stt}
            </button>
          );
        })}
      </div>

      <div className="seatingPlan-example">
        <div className="field">
          <StyleSeat></StyleSeat>
          <TagSmall kind="gray">Ghế thường</TagSmall>
        </div>
        <div className="field">
          <StyleSeat status="vip"></StyleSeat>
          <TagSmall kind="gray">Ghế vip</TagSmall>
        </div>
        <div className="field">
          <StyleSeat status="selecting"></StyleSeat>
          <TagSmall kind="gray">Ghế đang đặt</TagSmall>
        </div>
        <div className="field">
          <StyleSeat status="bought"></StyleSeat>
          <TagSmall kind="gray">Ghế đã được đặt</TagSmall>
        </div>
        <div className="field">
          <StyleSeat status="your">
            <img src={imgYourChoice} alt="your-seat" />
          </StyleSeat>
          <TagSmall kind="gray">Ghế bạn đặt</TagSmall>
        </div>
        {/* <SeatingPlanSampleSeat>Ghế thường</SeatingPlanSampleSeat>
        <SeatingPlanSampleSeat type='vip'>Ghế vip</SeatingPlanSampleSeat>
        <SeatingPlanSampleSeat type='selecting'>Ghế đang chọn</SeatingPlanSampleSeat>
        <SeatingPlanSampleSeat type='bought' img={imgMultiply}>
          Ghế đã được mua
        </SeatingPlanSampleSeat> */}
      </div>
    </div>
  );
};

export default memo(SeatingPlan);

const SeatingPlanSampleSeat = ({ type, children, img }) => (
  <div className="seating-plan-box">
    <div className={`seating-plan-square seating-plan-square--${type}`}>
      {img && <img src={img} alt="seat" />}
    </div>
    {children}
  </div>
);
