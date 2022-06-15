import Heading from "components/heading/Heading";
import Section from "components/section/Section";
import Tag from "components/tag/Tag";
import styled from "styled-components";

const StyledTicketRoomUser = styled.div`
  .tag {
    margin-right: 10px;
  }
`;

const TicketRoomUser = ({ data }) => {
  const { hoTen, soDT, email } = data;
  return (
    <StyledTicketRoomUser>
      <Section>
        <Heading>Thông tin khách hàng</Heading>
        <div>
          <Tag className="tag" kind="secondary">
            Họ tên:
          </Tag>
          <span>{hoTen}</span>
        </div>
        <div>
          <Tag className="tag" kind="secondary">
            Email:
          </Tag>
          <span>{soDT}</span>
        </div>
        <div>
          <Tag className="tag" kind="secondary">
            Số điện thoại:
          </Tag>
          <span>{email}</span>
        </div>
      </Section>
    </StyledTicketRoomUser>
  );
};

export default TicketRoomUser;
