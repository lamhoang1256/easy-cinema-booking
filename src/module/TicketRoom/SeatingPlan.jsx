import { memo } from "react";
import { useDispatch } from "react-redux";
import { selectSeat } from "redux/actions/ticketRoom.action";

const imgMultiply = `${process.env.REACT_APP_PUBLIC}/assets/images/chore/seat-multiply.png`;
const imgYourChoice = `${process.env.REACT_APP_PUBLIC}/assets/images/chore/seat-your-choice.png`;

const SeatingPlan = ({ danhSachGhe, selectingSeatList }) => {
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const handleSelectSeat = (seat) => {
    dispatch(selectSeat(seat));
  };

  return (
    <div className='seating-plan'>
      <div className='seating-plan-container'>
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
              {bought !== "" && !isYouBought && <img src={imgMultiply} alt='multiply' />}
              {bought && isYouBought && (
                <img src={imgYourChoice} alt='youBought' className='seating-plan-youBought' />
              )}
              {!bought && seat.stt}
            </button>
          );
        })}
      </div>

      <div className='seating-plan-sample'>
        <SeatingPlanSampleSeat>Ghế thường</SeatingPlanSampleSeat>
        <SeatingPlanSampleSeat type='vip'>Ghế vip</SeatingPlanSampleSeat>
        <SeatingPlanSampleSeat type='selecting'>Ghế đang chọn</SeatingPlanSampleSeat>
        <SeatingPlanSampleSeat type='bought' img={imgMultiply}>
          Ghế đã được mua
        </SeatingPlanSampleSeat>
      </div>
    </div>
  );
};

export default memo(SeatingPlan);

const SeatingPlanSampleSeat = ({ type, children, img }) => (
  <div className='seating-plan-box'>
    <div className={`seating-plan-square seating-plan-square--${type}`}>
      {img && <img src={img} alt='seat' />}
    </div>
    {children}
  </div>
);
