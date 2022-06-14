import { formatLocaleDateString } from "utilities/formatDate";
import styled from "styled-components";
import Description from "components/text/Description";

const StyledDetailOverview = styled.div`
  font-size: 1.8rem;
  line-height: 2;
  flex: 1;
  color: var(--white);
  .field {
    gap: 8px;
    display: flex;
    align-items: center;
  }
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
      <div className="field">
        <span>Tên phim:</span>
        <Description>{tenPhim}</Description>
      </div>
      <div className="field">
        <span>Ngày công chiếu:</span>
        {formatLocaleDateString(ngayKhoiChieu)}
      </div>
      <div className="field">
        <span>Điểm đánh giá:</span>
        <Description>{danhGia / 2 + "/ 5"}</Description>
      </div>
      <div className="field">
        <span>Đạo diễn:</span>
        <Description>Adam Wingard</Description>
      </div>
      <div className="field">
        <span>Diễn viên:</span>
        <Description>Kyle Chandler, Rebecca Hall, Eiza González, Millie Bobby Brown</Description>
      </div>
    </StyledDetailOverview>
  );
};

export default DetailOverview;
