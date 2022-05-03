import { memo } from "react";
import { useDispatch } from "react-redux";
import { selectSeat } from "redux/actions/movie/movieTicketRoom.action";
import "./seatingPlan.scss";

const imgMultiply = `${process.env.REACT_APP_PUBLIC}/assets/images/seat-multiply.png`;
const imgYourChoice = `${process.env.REACT_APP_PUBLIC}/assets/images/seat-your-choice.png`;

const SeatingPlan = ({ danhSachGhe, listSelectingSeat }) => {
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const handleSelectChair = (seat) => {
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
          const isSelecting = listSelectingSeat?.findIndex((c) => c.maGhe === seat.maGhe);

          const vip = isVip ? `${baseSeat}--vip` : "";
          const bought = isBought ? `${baseSeat}--bought` : "";
          const youBought = isYouBought ? `${baseSeat}--youBought` : "";
          const selecting = isSelecting === -1 ? "" : `${baseSeat}--selecting`;

          return (
            <button
              disabled={bought !== "" ? true : false}
              className={`${baseSeat} ${bought} ${vip} ${selecting} ${youBought}`}
              onClick={() => handleSelectChair(seat)}
              key={index}
            >
              {/* if seat is bought orther people display X */}
              {bought !== "" && !isYouBought && <img src={imgMultiply} alt='multiply' />}
              {/* if seat is bought by you display your choice  */}
              {bought && isYouBought && (
                <img src={imgYourChoice} alt='youBought' className='seating-plan-youBought' />
              )}
              {/* if seat isn't bought display number seat */}
              {!bought && seat.stt}
            </button>
          );
        })}
      </div>
      <div className='seating-plan-info'>
        <div className='seating-plan-box'>
          <div className='seating-plan-square'></div>
          Ghế thường
        </div>
        <div className='seating-plan-box'>
          <div className='seating-plan-square seating-plan-square--vip'></div>
          Ghế vip
        </div>
        <div className='seating-plan-box'>
          <div className='seating-plan-square seating-plan-square--selecting'></div>
          Ghế đang chọn
        </div>
        <div className='seating-plan-box'>
          <div className='seating-plan-square seating-plan-square--bought'>
            <img src={imgMultiply} alt='multiply' />
          </div>
          Ghế đã được mua
        </div>
      </div>
    </div>
  );
};

export default memo(SeatingPlan);
