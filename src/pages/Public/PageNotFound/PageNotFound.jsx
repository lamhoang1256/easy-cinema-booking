import React from "react";
import { Link } from "react-router-dom";
import "./pageNotFound.scss";

const PageNotFound = () => {
  return (
    <div className='page-error'>
      <div className='page-error-container'>
        <div className='page-error-gradient'>404</div>
        <h2 className='page-error-heading'>Không tìm thấy nội dung</h2>
        <div className='page-error-desc'>
          <p>URL của nội dung này đã bị thay đổi hoặc không còn tồn tại.</p>
          <p>Vui lòng kiểm tra lại URL và thử lại hoặc nhấn nút để trở về trang chủ</p>
        </div>
        <Link to='/'>
          <button className='btn btn--primary'>Quay lại trang chủ</button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
