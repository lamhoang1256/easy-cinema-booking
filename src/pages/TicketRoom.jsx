import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// component
import LoadingAnimation from "components/LoadingAnimation/LoadingAnimation";
import ModalAlert from "module/TicketRoom/ModalAlert";
import ModalBill from "module/TicketRoom/ModalBill";
import SeatingPlan from "module/TicketRoom/SeatingPlan";
import { buyTicket, getTicketRoom, resetSelectingSeat } from "redux/actions/ticketRoom.action";
// utilities
import Button from "components/button/Button";
import Heading from "components/heading/Heading";
import Section from "components/section/Section";
import Tag from "components/tag/Tag";
import { useCountDownBooking } from "hooks/useCountDownBooking";
import TicketRoomDetail from "module/ticket-room/TicketRoomDetail";
import TicketRoomUser from "module/ticket-room/TicketRoomUser";
import styled from "styled-components";
import { calculateSumMoney } from "utilities/calculateSumMoney";
import { formatTimeTwoDigit } from "utilities/formatDate";
import { sweetAlert } from "utilities/sweetAlert";

const StyledTicketRoom = styled.div`
  .ticketRoom-countdown {
    text-align: center;
  }
  .ticketRoom-time,
  .ticketRoom-price {
    color: var(--primary-color);
  }
  .ticketRoom-screen {
    margin-top: 10px;
    padding: 2px 0;
    text-align: center;
    background-color: var(--gray-color);
    color: var(--primary-color);
    border-radius: 50% 50% 0 0;
  }
  .ticketRoom-boxed {
    display: flex;
    gap: 20px;
  }
  .btn-buy {
    margin-top: 10px;
    width: 100%;
  }
`;

const TicketRoom = () => {
  const { idTicketRoom } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const { isLoading, dataTicketRoom, selectingSeatList } = useSelector((state) => state.TicketRoom);

  const [isShowBill, setIsShowBill] = useState(false);
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
      setIsShowBill(true);
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
          <div className="container">
            <div className="grid-layout">
              {/* Planing map seat */}
              <div className="column1">
                <Section>
                  <div className="ticketRoom-countdown">
                    <Tag kind="gray">Thời gian giữ ghế :</Tag>{" "}
                    <Tag kind="primary">{formatTimeTwoDigit(minutes, seconds)}</Tag>
                  </div>
                  <div className="ticketRoom-screen">Màn hình</div>
                  <SeatingPlan
                    selectingSeatList={selectingSeatList}
                    danhSachGhe={dataTicketRoom.danhSachGhe}
                  />
                </Section>
              </div>
              {/* Information movie, user, bill, total money... */}
              <div className="column2">
                <TicketRoomDetail
                  data={dataTicketRoom.thongTinPhim}
                  selectingSeatList={selectingSeatList}
                ></TicketRoomDetail>
                <TicketRoomUser data={userInfo}></TicketRoomUser>
                <Section>
                  <Heading kind="secondary">Tổng tiền: {totalMoney} VNĐ</Heading>
                  <Button kind="purple" className="btn-buy" onClick={handleBuyTicket}>
                    Đặt vé
                  </Button>
                </Section>
              </div>
            </div>
          </div>
          {/* open modal bill when buy ticket successful  */}
          {isShowBill && <ModalBill totalMoney={totalMoney} />}
          {/* open modal notify if select seat over 5 minutes */}
          {isShowModalAlert && <ModalAlert />}
        </StyledTicketRoom>
      )}
    </>
  );
};

export default TicketRoom;
