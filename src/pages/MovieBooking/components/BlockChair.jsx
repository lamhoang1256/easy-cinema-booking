import { useDispatch } from "react-redux";
import { selectChairAction } from "../../../redux/actions/movieBooking.action";
import "./blockChair.scss";

export const BlockChair = ({ danhSachGhe, listGheDangChon }) => {
  const dispatch = useDispatch();
  const handleSelectChair = (chair) => {
    dispatch(selectChairAction(chair));
  };

  return (
    <div className='block-chair'>
      {/* render danh sách ghế ra giao diện */}
      <div className='block-chair-container'>
        {danhSachGhe.map((chair, index) => {
          // kiểm tra loại ghế nếu false trả về "", true trả về className
          const selected = chair.daDat ? "block-chair-chair--selected" : "";
          const vip = chair.loaiGhe === "Vip" ? "block-chair-chair--vip" : "";
          const selecting =
            listGheDangChon.findIndex((c) => c.maGhe === chair.maGhe) === -1
              ? ""
              : "block-chair-chair--selecting";

          return (
            <button
              disabled={selected !== "" ? true : false}
              className={`block-chair-chair ${selected} ${vip} ${selecting}`}
              onClick={() => handleSelectChair(chair)}
              key={index}
            >
              {selected !== "" ? <img src='./assets/chair-notchoose.png' alt='' /> : chair.stt}
            </button>
          );
        })}
      </div>
      <div className='block-chair-info'>
        <div className='block-chair-box'>
          <div className='block-chair-square'></div>
          Ghế thường
        </div>
        <div className='block-chair-box'>
          <div className='block-chair-square block-chair-square--vip'></div>
          Ghế vip
        </div>
        <div className='block-chair-box'>
          <div className='block-chair-square block-chair-square--selecting'></div>
          Ghế đang chọn
        </div>
        <div className='block-chair-box'>
          <div className='block-chair-square block-chair-square--selected'>
            <img src='./assets/chair-notchoose.png' alt='' />
          </div>
          Ghế đã được mua
        </div>
      </div>
    </div>
  );
};
