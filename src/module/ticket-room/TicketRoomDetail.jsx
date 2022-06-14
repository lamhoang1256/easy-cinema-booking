import Field from "components/field/Field";
import Section from "components/section/Section";
import Tag from "components/tag/Tag";
import Description from "components/text/Description";
import styled from "styled-components";

const StyledTicketRoomDetail = styled.div`
  .tag {
    flex-shrink: 0;
  }
`;

const TicketRoomDetail = ({ data, selectingSeatList }) => {
  const { tenPhim, hinhAnh, tenCumRap, diaChi, gioChieu, ngayChieu } = data;
  return (
    <StyledTicketRoomDetail>
      <Section>
        <Tag kind="secondary">Thông tin phim</Tag>
        <div className="ticketRoom-thumb">
          <img src={hinhAnh} alt="movie-thumb" />
        </div>
        <Field>
          <Tag className="tag" kind="secondary">
            Tên phim:
          </Tag>
          <Description kind="gray">{tenPhim}</Description>
        </Field>
        <Field>
          <Tag className="tag" kind="secondary">
            Rạp:
          </Tag>
          <Description kind="gray">{tenCumRap}</Description>
        </Field>
        <Field>
          <Tag className="tag" kind="secondary">
            Địa chỉ:
          </Tag>
          <Description kind="gray">{diaChi}</Description>
        </Field>
        <Field>
          <Tag className="tag" kind="secondary">
            Suất chiếu:
          </Tag>
          <Description kind="gray">{`${gioChieu} ${ngayChieu}`}</Description>
        </Field>
        <Field>
          <Tag className="tag" kind="secondary">
            Số ghế đã chọn:
          </Tag>
          <Description kind="gray">
            {selectingSeatList?.length !== 0
              ? selectingSeatList?.map((seat, index) => {
                  // Eg: if 3 seat : 3,5,9 -> if 1 seat : 3 (not ,)
                  return index === 0 ? seat.tenGhe : `, ${seat.tenGhe}`;
                })
              : "Chưa chọn ghế"}
          </Description>
        </Field>
      </Section>
    </StyledTicketRoomDetail>
  );
};

export default TicketRoomDetail;
