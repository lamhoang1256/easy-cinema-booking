import React from "react";
import "./comment.scss";

export const Comment = () => {
  return (
    <div className='comment__item'>
      <div className='comment__info'>
        <img
          className='comment__avatar'
          src={`${process.env.REACT_APP_PUBLIC}/assets/user-avatar-1.jpg`}
          alt=''
        />
        <div className='comment__profile'>
          <h3>John Snow</h3>
          <span>13/09/2022</span>
        </div>
      </div>
      <div className='comment__desc'>
        Rất mong chờ phim sẽ xuất sắc vì chọn đề tài mới lạ. Tuy nhiên xem xong khá thất vọng vì
        mạch cảm xúc chưa đạt đỉnh, đánh đấm cũng không đã mắt. Nhưng nếu bạn là fan của 1 trong 2
        anh thì có thể đi xem ủng hộ.
      </div>
    </div>
  );
};
