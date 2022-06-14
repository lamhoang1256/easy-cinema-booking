import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// component
import Banner from "components/Banner/Banner";
import ModalBill from "module/TicketRoom/ModalBill";
import SeatingPlan from "module/TicketRoom/SeatingPlan";
import ModalAlert from "module/TicketRoom/ModalAlert";
import LoadingAnimation from "components/LoadingAnimation/LoadingAnimation";
import { getTicketRoom, buyTicket, resetSelectingSeat } from "redux/actions/ticketRoom.action";
// utilities
import { useCountDownBooking } from "hooks/useCountDownBooking";
import { formatTimeTwoDigit } from "utilities/formatDate";
import { sweetAlert } from "utilities/sweetAlert";
import { calculateSumMoney } from "utilities/calculateSumMoney";
import styled from "styled-components";
import Tag from "components/tag/Tag";
import Section from "components/section/Section";
import TicketRoomDetail from "module/ticket-room/TicketRoomDetail";

const StyledTicketRoom = styled.div`
  .ticketRoom-countdown {
    text-align: center;
  }
  .ticketRoom-time {
    color: $primary-color;
  }
  .ticketRoom-screen {
    margin-top: 10px;
    padding: 2px 0;
    text-align: center;
    background-color: var(--gray-color);
    color: var(--gray-color);
    border-radius: 50% 50% 0 0;
  }
  .ticketRoom-boxed {
    display: flex;
    gap: 20px;
  }
  .ticketRoom-thumb {
    width: 140px;
    overflow: hidden;
    border-radius: 10px;
  }
  .ticketRoom-price {
    color: $primary-color;
  }
`;

const urlBanner = `${process.env.REACT_APP_PUBLIC}/assets/images/background/booking.jpg`;
const TicketRoom = () => {
  const { idTicketRoom } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const { isLoading, dataTicketRoom, selectingSeatList } = useSelector((state) => state.TicketRoom);

  const [isShowModalBill, setIsShowModalBill] = useState(false);
  const [isShowModalAlert, setIsShowModalAlert] = useState(false);
  const totalMoney = calculateSumMoney(selectingSeatList, "giaVe");

  const handleBuyTicket = async () => {
    const requestBuyTicket = {
      maLichChieu: dataTicketRoom.thongTinPhim.maLichChieu.toString(),
      danhSachVe: selectingSeatList,
    };
    if (requestBuyTicket.danhSachVe.length === 0) {
      sweetAlert("error", "Vui lòng chọn ghế", "Bạn chưa chọn ghế nào cả!");
      return;
    }
    if (requestBuyTicket.danhSachVe.length > 10) {
      sweetAlert("error", "Không chọn quá 10 ghế", "Bạn không được chọn quá 10 ghế!");
      return;
    }
    if (!userInfo) {
      sweetAlert("error", "Mua vé thất bại", "Vui lòng đăng nhập để tiếp tục mua vé!");
      return;
    }
    const { isBuyTicketSuccess } = await dispatch(buyTicket(requestBuyTicket));
    if (isBuyTicketSuccess) {
      setIsShowModalBill(true);
      clearInterval(idSetInterval.current);
    }
  };

  // countdown time select seat (5 min -> 0 seconds)
  const { idSetInterval, minutes, seconds } = useCountDownBooking(setIsShowModalAlert);

  useEffect(() => {
    if (!userInfo) {
      navigate("/auth/login");
      return;
    }
    window.scrollTo(0, 0);
    dispatch(getTicketRoom(idTicketRoom));
    dispatch(resetSelectingSeat());
  }, [idTicketRoom]);

  return (
    <>
      {isLoading && <LoadingAnimation />}
      {!isLoading && (
        <StyledTicketRoom>
          <Banner urlBanner={`url(${urlBanner})`} heading={"Trang đặt vé phim"} />
          <div className="container">
            <div className="grid-layout">
              <div className="column1">
                <Section>
                  <div className="ticketRoom-countdown">
                    <Tag kind="gray">Thời gian giữ ghế :</Tag>{" "}
                    <Tag kind="primary">{formatTimeTwoDigit(minutes, seconds)}</Tag>
                  </div>
                  <div className="ticketRoom-main">
                    <div className="ticketRoom-screen">Màn hình</div>
                    <SeatingPlan
                      selectingSeatList={selectingSeatList}
                      danhSachGhe={dataTicketRoom.danhSachGhe}
                    />
                  </div>
                </Section>
              </div>

              <div className="column2">
                <TicketRoomDetail
                  data={dataTicketRoom.thongTinPhim}
                  selectingSeatList={selectingSeatList}
                ></TicketRoomDetail>
                {/* <InfoMovie
                  infoMovie={dataTicketRoom.thongTinPhim}
                  selectingSeatList={selectingSeatList}
                /> */}
                <InfoUser userInfo={userInfo} />
                <h2 className="ticketRoom-price">Tổng tiền: {totalMoney} VNĐ</h2>
                <button className="btn btn--primary" onClick={handleBuyTicket}>
                  Đặt vé
                </button>
              </div>
            </div>
          </div>
          {/* open modal bill when buy ticket successful  */}
          {isShowModalBill && <ModalBill totalMoney={totalMoney} />}
          {/* open modal notify if select seat over 5 minutes */}
          {isShowModalAlert && <ModalAlert />}
        </StyledTicketRoom>
      )}
    </>
  );
};

// const InfoMovie = memo(({ infoMovie, selectingSeatList }) => {
//   const { hinhAnh, tenPhim, tenCumRap, diaChi, gioChieu, ngayChieu } = infoMovie;
//   return (

//   );
// });

const InfoUser = memo(({ userInfo }) => {
  const { hoTen, email, soDT } = userInfo;
  return (
    <div className="ticketRoom-info-user">
      <h2>Thông tin khách hàng</h2>
      <InfoItem label="Họ tên">{hoTen}</InfoItem>
      <InfoItem label="Email">{email}</InfoItem>
      <InfoItem label="Số điện thoại">{soDT}</InfoItem>
    </div>
  );
});

const InfoItem = ({ label, children }) => (
  <div>
    <span className="label">{label}:</span>
    {children}
  </div>
);

export default TicketRoom;
