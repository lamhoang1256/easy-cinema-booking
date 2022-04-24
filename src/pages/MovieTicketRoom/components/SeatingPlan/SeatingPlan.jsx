import { useDispatch } from "react-redux";
import { selectSeat } from "redux/actions/movie/movieTicketRoom.action";
import "./seatingPlan.scss";

export const SeatingPlan = ({ danhSachGhe, listSelectingSeat }) => {
  const dispatch = useDispatch();
  const userInfo = localStorage.getItem("userInfo");

  //xử lí chọn seat
  const handleSelectChair = (seat) => {
    dispatch(selectSeat(seat));
  };

  return (
    <div className='seating-plan'>
      {/* render all seat */}
      <div className='seating-plan-container'>
        {danhSachGhe.map((seat, index) => {
          const baseClass = "seating-plan-seat";
          //seat vip
          const vip = seat.loaiGhe === "Vip" ? `${baseClass}--vip` : "";
          //seat bought
          const selected = seat.daDat ? `${baseClass}--selected` : "";
          //seat is bought buy you
          const yourchoice =
            seat.daDat && seat.taiKhoanNguoiDat === "nguyenlam" ? `${baseClass}--yourchoice` : "";
          //seat is selecting
          const selecting =
            listSelectingSeat.findIndex((c) => c.maGhe === seat.maGhe) === -1
              ? ""
              : `${baseClass}--selecting`;

          return (
            <button
              disabled={selected !== "" ? true : false}
              className={`${baseClass} ${selected} ${vip} ${selecting} ${yourchoice}`}
              onClick={() => handleSelectChair(seat)}
              key={index}
            >
              {/* nếu seat đã được mua bởi người khác sẽ hiện hình dấu X, mua bởi bạn thì hiện your choice */}
              {selected !== "" && seat.taiKhoanNguoiDat !== "nguyenlam" ? (
                <img src={`${process.env.REACT_APP_PUBLIC}/assets/images/seat-notchoose.png`} />
              ) : seat.taiKhoanNguoiDat === userInfo.taiKhoan ? (
                <img
                  src={`${process.env.REACT_APP_PUBLIC}/assets/images/seat-your-choice.png`}
                  className='seating-plan-yourchoice'
                />
              ) : (
                seat.stt
              )}
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
          <div className='seating-plan-square seating-plan-square--selected'>
            <img src={`${process.env.REACT_APP_PUBLIC}/assets/images/seat-notchoose.png`} alt='' />
          </div>
          Ghế đã được mua
        </div>
      </div>
    </div>
  );
};
