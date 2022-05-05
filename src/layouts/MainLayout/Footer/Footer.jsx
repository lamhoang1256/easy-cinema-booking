import { Link } from "react-router-dom";
import "./footer.scss";

const footerNav = [
  {
    title: "Cineplex",
    path: [
      "Hướng đến mục tiêu mang lại sự nhanh chóng, trực quan không cần ra mua vé trực tiếp tại rạp. Tiết kiệm thời gian và tiện lợi.",
    ],
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
    title: "Điều khoản sử dụng",
    path: [
      "Điều khoản chung",
      "Hệ thống rạp chiếu",
      "Điều khoản giao dịch",
      "Chính sách quyền riêng tư",
    ],
  },
];

const images = [
  {
    id: 1,
    url: "images/footer/footer-1.png",
  },
  {
    id: 2,
    url: "images/footer/footer-2.png",
  },
  {
    id: 3,
    url: "images/footer/footer-3.png",
  },
  {
    id: 4,
    url: "images/footer/footer-4.png",
  },
  {
    id: 5,
    url: "images/footer/footer-5.png",
  },
  {
    id: 6,
    url: "images/footer/footer-6.png",
  },
];

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer-list'>
          {footerNav.map((nav, index) => (
            <div className='footer-item' key={index}>
              <h3 className='footer-title'>{nav.title}</h3>
              {nav.path.map((item, id) => (
                <p key={id}>{item}</p>
              ))}
            </div>
          ))}

          <div className='footer-item'>
            <h3 className='footer-title'>Thư viện hình ảnh</h3>
            <div className='footer-images'>
              {images.map((image) => (
                <div className='footer-image' key={image.id}>
                  <img src={`${process.env.PUBLIC_URL}/assets/${image.url}`} alt='image-footer' />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='footer-bottom'>
          <div className='footer-social'>
            <ion-icon name='logo-facebook' style={{ color: "#3b5998" }}></ion-icon>
            <ion-icon name='logo-twitter' style={{ color: "#55ACEE" }}></ion-icon>
            <ion-icon name='logo-youtube' style={{ color: "#ff0000" }}></ion-icon>
            <ion-icon name='logo-google' style={{ color: "#DD4B39" }}></ion-icon>
          </div>
          <div className='footer-copyright'>
            Được thiết kế và phát triển bởi{" "}
            <a href='https://github.com/lamhoang1256' className='text--primary'>
              Nguyen Hoang Lam
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
