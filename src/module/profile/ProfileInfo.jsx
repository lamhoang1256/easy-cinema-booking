import Heading from "components/heading/Heading";
import Field from "components/field/Field";
import Tag from "components/tag/Tag";
import styled from "styled-components";

const StyledProfileInfo = styled.div`
  .content {
    color: var(--gray-color);
    font-size: 1.8rem;
  }
`;

const ProfileInfo = ({ data }) => {
  const { taiKhoan, hoTen, email, soDT, maLoaiNguoiDung } = data;
  return (
    <StyledProfileInfo>
      <Heading>Thông tin cơ bản</Heading>
      <Field>
        <Tag kind="secondary">Tên tài khoản:</Tag>
        <span className="content">{taiKhoan}</span>
      </Field>
      <Field>
        <Tag kind="secondary">Họ và tên:</Tag>
        <span className="content">{hoTen}</span>
      </Field>
      <Field>
        <Tag kind="secondary">Email:</Tag>
        <span className="content">{email}</span>
      </Field>
      <Field>
        <Tag kind="secondary">Số điện thoại:</Tag>
        <span className="content">{soDT}</span>
      </Field>
      <Field>
        <Tag kind="secondary">Quyền truy cập</Tag>
        <span className="content">{maLoaiNguoiDung === "QuanTri" ? "Quản Trị" : "Khách Hàng"}</span>
      </Field>
    </StyledProfileInfo>
  );
};

export default ProfileInfo;
