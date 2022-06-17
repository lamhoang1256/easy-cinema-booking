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

// createdAt: "2022-06-16T02:44:48.000Z"
// description: "As the most powerful entity of all time, the Demon Lord Varvatos thinks life is a big fat snore
// duration: 100
// id: 4
// name: "Shijou Saikyou no Daimaou, Murabito A ni Tensei suru 1"
// poster: "https://res.cloudinary.com/lamhoang1256/image/upload/v1655386300/omtbs/103438246d7c611739d702285dcd9fe4.jpg"
// rating: 4.5
// releaseDate: "2022-09-13"
// status: "now-showing"
// trailer: "https://www.youtube.com/watch?v=Nm0ImwyPaVE"
// updatedAt: "2022-06-16T13:32:11.000Z"

const TicketRoomDetail = ({ movie }) => {
  const { name, poster } = movie;
  return (
    <StyledTicketRoomDetail>
      <Heading>Thông tin phim</Heading>
      <Field>
        <img src={poster} alt="poster" className="poster" />
      </Field>
      <Field>
        <Tag kind="secondary">Tên phim:</Tag>
        <span>{name}</span>
      </Field>
    </StyledTicketRoomDetail>
  );
};

export default TicketRoomDetail;
