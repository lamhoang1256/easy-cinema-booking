import Field from "components/field/FieldText";
import Heading from "components/heading/Heading";
import Section from "components/section/Section";
import Tag from "components/tag/Tag";

const TicketRoomUser = ({ data }) => {
  const { hoTen, soDT, email } = data;
  return (
    <Section>
      <Heading>Thông tin khách hàng</Heading>
      <Field>
        <Tag kind="secondary">Họ tên:</Tag>
        <span>{hoTen}</span>
      </Field>
      <Field>
        <Tag kind="secondary">Email:</Tag>
        <span>{soDT}</span>
      </Field>
      <Field>
        <Tag kind="secondary">Số điện thoại:</Tag>
        <span>{email}</span>
      </Field>
    </Section>
  );
};

export default TicketRoomUser;
