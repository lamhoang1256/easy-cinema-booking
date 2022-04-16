import React from "react";
import "./pageNotFound.scss";

export const PageNotFound = () => {
  return (
    <div className='notfound'>
      <div className='notfound-container'>
        <div className='notfound-gradient'>404</div>
        <h2 className='notfound-heading'>Không tìm thấy nội dung</h2>
        <div className='notfound-desc'>
          <p>URL của nội dung này đã bị thay đổi hoặc không còn tồn tại.</p>
          <p>
            Nếu bạn đang lưu URL này , hãy thử truy cập lại từ trang chủ thay vì dùng URL đã lưu.
          </p>
        </div>
        <button className='btn btn--primary'>Quay lại trang chủ</button>
      </div>
    </div>
  );
};
