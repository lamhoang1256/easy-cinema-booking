import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";

const footerNav = [
  {
    title: "Giới thiệu",
    path: ["Tiện ích online", "Thẻ quà tặng", "Tuyển dụng", "Liên hệ quảng cáo"],
  },
  {
    title: "Điều khoản sử dụng",
    path: ["Điều khoản chung", "Hệ thống rạp chiếu", "Giao dịch", "Chính sách quyền riêng tư"],
  },
  {
    title: "Chăm sóc khách hàng",
    path: [
      "Hotline: 1900 9999",
      "Giờ làm việc: 8:00 - 22:00 (Tất cả các ngày bao gồm cả Lễ Tết)",
      "Email hỗ trợ: hoidap@cineplex.vn",
    ],
  },
  {
    title: "Cineplex",
    path: [
      "Hướng đến mục tiêu mang lại sự nhanh chóng, trực quan không cần ra mua vé trực tiếp tại rạp. Tiết kiệm thời gian và tiện lợi.",
    ],
  },
];

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer-list'>
          {footerNav.map((item, index) => (
            <div className='footer-item' key={index}>
              <h3 className='footer-title'>{item.title}</h3>
              {item.path.map((e, id) => (
                <p key={id}>{e}</p>
              ))}
            </div>
          ))}
        </div>
        <div className='footer-copyright'>
          Được thiết kế và phát triển bởi{" "}
          <a href='https://github.com/lamhoang1256'>Nguyen Hoang Lam</a>
        </div>
      </div>
    </footer>
  );
};
