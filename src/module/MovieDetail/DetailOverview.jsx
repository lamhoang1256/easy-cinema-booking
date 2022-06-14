import Heading from "components/heading/Heading";
import { formatLocaleDateString } from "utilities/formatDate";
import styled from "styled-components";

const StyledDetailOverview = styled.div`
  font-size: 1.8rem;
  line-height: 2;
  flex: 1;
  color: var(--white);
  span {
    color: #9692c7;
    font-weight: 500;
    margin-right: 10px;
  }
`;

const DetailOverview = ({ data }) => {
  const { tenPhim, ngayKhoiChieu, danhGia } = data;
  return (
    <StyledDetailOverview>
      <Heading>Chi tiết phim</Heading>
      <div>
        <span>Tên phim:</span>
        {tenPhim}
      </div>
      <div>
        <span>Ngày công chiếu:</span>
        {formatLocaleDateString(ngayKhoiChieu)}
      </div>
      <div>
        <span>Điểm đánh giá:</span>
        {danhGia / 2 + "/ 5"}
      </div>
      <div>
        <span>Đạo diễn:</span>
        Adam Wingard
      </div>
      <div>
        <span>Diễn viên:</span>
        Kyle Chandler, Rebecca Hall, Eiza González, Millie Bobby Brown
      </div>
    </StyledDetailOverview>
  );
};

export default DetailOverview;
