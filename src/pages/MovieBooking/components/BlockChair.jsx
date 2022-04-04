import "./blockChair.scss";

export const BlockChair = ({ danhSachGhe }) => {
  console.log(danhSachGhe);
  return (
    <div className='block-chair'>
      {/* render danh sách ghế ra giao diện */}
      <div className='block-chair-container'>
        {danhSachGhe.map((chair, index) => {
          // kiểm tra loại ghế
          const selected = chair.daDat ? "block-chair-chair--selected" : "";
          const vip = chair.loaiGhe === "Vip" ? "block-chair-chair--vip" : "";
          // const selectedByYou

          return (
            <div className={`block-chair-chair ${selected} ${vip}`} key={index}>
              {chair.stt}
            </div>
          );
        })}

        {/* <div className='block-chair-chair selecting'></div>
        <div className='block-chair-chair selected'>
          <img src='./assets/chair-notchoose.png' alt='' />
        </div> */}
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
