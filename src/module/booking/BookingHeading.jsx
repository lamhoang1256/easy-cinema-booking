import styled from "styled-components";

const StyledBookingHeading = styled.h3`
  font-size: 2.4rem;
  margin-top: 6px;
`;

const BookingHeading = ({ children }) => {
  return <StyledBookingHeading>{children}</StyledBookingHeading>;
};

export default BookingHeading;
