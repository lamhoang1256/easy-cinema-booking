import { useSelector } from "react-redux";
import styled from "styled-components";
import Field from "components/field/FieldText";
import ImageResize from "components/image/ImageResize";
import BookingHeading from "module/booking/BookingHeading";
import BookingTag from "module/booking/BookingTag";

const StyledBookingMovie = styled.div`
  .overview {
    display: flex;
    gap: 10px;
  }
  .poster {
    margin-bottom: 10px;
    width: 140px;
    overflow: hidden;
    border-radius: 10px;
    flex-shrink: 0;
  }
  @media screen and (max-width: 767.98px) {
    .overview {
      flex-direction: column;
    }
  }
`;

const BookingMovie = () => {
  const { showtime } = useSelector((state) => state.booking);
  return (
    <StyledBookingMovie>
      <BookingHeading>Movie Information</BookingHeading>
      <div className="overview">
        <Field className="poster">
          <ImageResize width="140" url={showtime.movie.poster} alt="poster" />
        </Field>
        <div className="meta">
          <Field>
            <BookingTag>Name:</BookingTag>
            <span className="text">{showtime.movie.name}</span>
          </Field>
          <Field>
            <BookingTag>Rating:</BookingTag>
            <span className="text">{showtime.movie.rating}</span>
          </Field>
          <Field>
            <BookingTag>Duration:</BookingTag>
            <span className="text">{showtime.movie.duration}</span>
          </Field>
          <Field>
            <BookingTag>Release Date:</BookingTag>
            <span className="text">{showtime.movie.releaseDate}</span>
          </Field>
        </div>
      </div>
    </StyledBookingMovie>
  );
};

export default BookingMovie;
