import "./blockChair.scss";

export const BlockChair = ({ danhSachGhe }) => {
  console.log(danhSachGhe);
  return (
    <div className='blockChair'>
      {/* render danh sách ghế ra giao diện */}
      <div className='blockChair__container'>
        {danhSachGhe.map((chair, index) => {
          // kiểm tra loại ghế
          const selected = chair.daDat ? "selected" : "";
          const vip = chair.loaiGhe === "Vip" ? "vip" : "";
          // const selectedByYou

          return (
            <div className={`blockChair__chair ${selected} ${vip}`} key={index}>
              {chair.stt}
            </div>
          );
        })}

        {/* <div className='blockChair__chair selecting'></div>
        <div className='blockChair__chair selected'>
          <img src='./assets/chair-notchoose.png' alt='' />
        </div> */}
      </div>
      <div className='movieBooking__info'>
        <div className='info__box'>
          <div className='info__chair'></div>
          Ghế thường
        </div>
        <div className='info__box'>
          <div className='info__chair vip'></div>
          Ghế vip
        </div>
        <div className='info__box'>
          <div className='info__chair selecting'></div>
          Ghế đang chọn
        </div>
        <div className='info__box'>
          <div className='info__chair selected'>
            <img src='./assets/chair-notchoose.png' alt='' />
          </div>
          Ghế đã được mua
        </div>
      </div>
    </div>
  );
};
