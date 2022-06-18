import styled from "styled-components";

const StyledBookingTag = styled.h3`
  display: inline-block;
  color: #ffce73;
  margin-right: 6px;
`;

const BookingTag = ({ children }) => {
  return <StyledBookingTag>{children}</StyledBookingTag>;
};

export default BookingTag;
