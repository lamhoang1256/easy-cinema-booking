import styled from "styled-components";

const StyledFooter = styled.footer`
  margin-top: 30px;
  padding: 50px 0 50px;
  .footer-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px 30px;
  }
  .footer-item {
    h3 {
      margin: 8px 0;
    }
    p {
      padding: 6px 0;
    }
  }
  .footer-item:first-child {
    h3 {
      font-size: 3rem;
      color: var(--primary-color);
      margin: 0 0 5px;
    }
    p {
      padding: 0;
      line-height: 2;
    }
  }
  .footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 40px;
    gap: 30px;
  }
  .footer-social {
    display: flex;
    gap: 20px;
  }
  .footer-social ion-icon {
    font-size: 2.2rem;
  }
  .footer-images {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .footer-image img {
    border-radius: 8px;
    object-fit: cover;
    width: 80px;
    height: 80px;
  }
  @media screen and (max-width: 1023.98px) {
    .footer-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 767.98px) {
    .footer-list {
      grid-template-columns: repeat(1, 1fr);
    }
    .footer-bottom {
      flex-direction: column;
    }
    .footer-item p {
      font-size: 1.4rem;
    }
  }
`;

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
    <StyledFooter>
      <div className="container">
        <div className="footer-list">
          {footerNav.map((nav, index) => (
            <div className="footer-item" key={index}>
              <h3 className="footer-title">{nav.title}</h3>
              {nav.path.map((item, id) => (
                <p key={id}>{item}</p>
              ))}
            </div>
          ))}

          <div className="footer-item">
            <h3 className="footer-title">Thư viện hình ảnh</h3>
            <div className="footer-images">
              {images.map((image) => (
                <div className="footer-image" key={image.id}>
                  <img src={`${process.env.PUBLIC_URL}/assets/${image.url}`} alt="image-footer" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-social">
            <ion-icon name="logo-facebook" style={{ color: "#3b5998" }}></ion-icon>
            <ion-icon name="logo-twitter" style={{ color: "#55ACEE" }}></ion-icon>
            <ion-icon name="logo-youtube" style={{ color: "#ff0000" }}></ion-icon>
            <ion-icon name="logo-google" style={{ color: "#DD4B39" }}></ion-icon>
          </div>
          <div className="footer-copyright">
            Được thiết kế và phát triển bởi{" "}
            <a href="https://github.com/lamhoang1256" className="text--primary">
              Nguyen Hoang Lam
            </a>
          </div>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;
