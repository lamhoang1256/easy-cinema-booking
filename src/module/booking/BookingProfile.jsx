import { useSelector } from "react-redux";
import styled from "styled-components";
import Field from "components/field/FieldText";
import BookingHeading from "./BookingHeading";
import BookingTag from "./BookingTag";

const StyledBookingProfile = styled.div``;

const BookingProfile = () => {
  const { currentUser } = useSelector((state) => state.authentication);
  const { firstName, lastName, email, phoneNumber } = currentUser;
  return (
    <StyledBookingProfile>
      <BookingHeading>User Information</BookingHeading>
      <Field>
        <BookingTag kind="secondary">Fullname: </BookingTag>
        <span>{`${firstName} ${lastName}`}</span>
      </Field>
      <Field>
        <BookingTag kind="secondary">Email:</BookingTag>
        <span>{email}</span>
      </Field>
      <Field>
        <BookingTag kind="secondary">Số điện thoại:</BookingTag>
        <span>{phoneNumber}</span>
      </Field>
    </StyledBookingProfile>
  );
};

export default BookingProfile;
