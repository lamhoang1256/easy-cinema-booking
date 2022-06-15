import styled from "styled-components";
import Field from "components/field/FieldText";
import Heading from "components/heading/Heading";
import Tag from "components/tag/Tag";

const StyledTicketRoomDetail = styled.div`
  .poster {
    margin: 10px 0;
    width: 140px;
    overflow: hidden;
    border-radius: 10px;
  }
`;

const TicketRoomDetail = ({ data, selectingSeatList }) => {
  const { tenPhim, hinhAnh, tenCumRap, diaChi, gioChieu, ngayChieu } = data;
  return (
    <StyledTicketRoomDetail>
      <div>
        <Heading>Thông tin phim</Heading>
        <Field>
          <img src={hinhAnh} alt="poster" className="poster" />
        </Field>
        <Field>
          <Tag kind="secondary">Tên phim:</Tag>
          <span>{tenPhim}</span>
        </Field>
        <Field>
          <Tag kind="secondary">Rạp:</Tag>
          <span>{tenCumRap}</span>
        </Field>
        <Field>
          <Tag kind="secondary">Địa chỉ:</Tag>
          <span>{diaChi}</span>
        </Field>
        <Field>
          <Tag kind="secondary">Suất chiếu:</Tag>
          <span>{`${gioChieu} ${ngayChieu}`}</span>
        </Field>
        <Field>
          <Tag kind="secondary">Số ghế đã chọn:</Tag>
          <span>
            {selectingSeatList?.length !== 0
              ? selectingSeatList?.map(({ tenGhe }, index) =>
                  index === 0 ? tenGhe : `, ${tenGhe}`
                )
              : "Chưa chọn ghế"}
          </span>
        </Field>
      </div>
    </StyledTicketRoomDetail>
  );
};

export default TicketRoomDetail;
