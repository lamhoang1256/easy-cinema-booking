import { useDispatch } from "react-redux";
import { selectChairAction } from "redux/actions/movieBuyTicket.action";
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
          const baseClass = "block-chair-chair";
          //ghế vip
          const vip = chair.loaiGhe === "Vip" ? `${baseClass}--vip` : "";
          //ghế đã được mua
          const selected = chair.daDat ? `${baseClass}--selected` : "";
          //ghế được mua bởi bạn
          const yourchoice =
            chair.daDat && chair.taiKhoanNguoiDat === "nguyenlam" ? `${baseClass}--yourchoice` : "";
          //ghế đang chọn
          const selecting =
            listGheDangChon.findIndex((c) => c.maGhe === chair.maGhe) === -1
              ? ""
              : `${baseClass}--selecting`;

          return (
            <button
              disabled={selected !== "" ? true : false}
              className={`${baseClass} ${selected} ${vip} ${selecting} ${yourchoice}`}
              onClick={() => handleSelectChair(chair)}
              key={index}
            >
              {/* nếu ghế đã được mua bởi người khác sẽ hiện hình dấu X, mua bởi bạn thì hiện your choice */}
              {selected !== "" && chair.taiKhoanNguoiDat !== "nguyenlam" ? (
                <img src={`${process.env.REACT_APP_PUBLIC}/assets/images/chair-notchoose.png`} />
              ) : chair.taiKhoanNguoiDat === "nguyenlam" ? (
                <img
                  src={`${process.env.REACT_APP_PUBLIC}/assets/images/chair-your-choice.png`}
                  className='block-chair-yourchoice'
                />
              ) : (
                chair.stt
              )}
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
            <img src={`${process.env.REACT_APP_PUBLIC}/assets/images/chair-notchoose.png`} alt='' />
          </div>
          Ghế đã được mua
        </div>
      </div>
    </div>
  );
};
