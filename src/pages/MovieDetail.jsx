import { useMediaQuery } from "hooks/useMediaQuery";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// component
import AddComment from "components/AddComment/AddComment";
import LoadingAnimation from "components/LoadingAnimation/LoadingAnimation";
import ModalTrailer from "components/ModalTrailer/ModalTrailer";
import PostRelated from "components/post/PostRelated";
import Comment from "module/MovieDetail/Comment";
import DetailShowtime from "module/MovieDetail/DetailShowtime";
import DetailShowtimeMobile from "module/MovieDetail/DetailShowtimeMobile";
import {
  getCalendarShowMovieDetail,
  getCommentList,
  getMovieDetail,
} from "redux/actions/movieDetail.action";
import { formatLocaleDateString } from "utilities/formatDate";

import DetailBanner from "module/MovieDetail/DetailBanner";
import styled from "styled-components";
import Heading from "components/heading/Heading";
import Tag from "components/tag/Tag";
import Description from "components/text/Description";
import DetailOverview from "module/MovieDetail/DetailOverview";
import Image from "components/image/Image";

const StyledMovieDetail = styled.div`
  .grid-layout {
    display: flex;
    gap: 20px;
  }
  .column1 {
    width: 65%;
  }
  .column2 {
    width: 35%;
    padding-top: 60px;
  }
  .detail-poster {
    width: 215px;
    transform: translateY(-130px);
    border-radius: 10px;
  }
  .detail-info {
    padding: 60px 0 20px;
    display: flex;
    gap: 0 40px;
    margin-bottom: -90px;
  }
  @media screen and (max-width: 1023.98px) {
    .grid-layout {
      flex-direction: column;
    }
    .column1,
    .column2 {
      width: 100%;
    }
  }
  @media screen and (max-width: 767.98px) {
    .detail-poster {
      margin-bottom: -90px;
    }
    .detail-info {
      flex-direction: column;
    }
  }
`;

const MovieDetail = () => {
  const { idDetail } = useParams();
  const dispatch = useDispatch();
  const { isLoading, movieDetail, togglePostComment } = useSelector((state) => state.movieDetail);
  const isMobile = useMediaQuery("(max-width:767.98px)");

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getMovieDetail(idDetail));
    dispatch(getCalendarShowMovieDetail(idDetail));
  }, []);
  useEffect(() => {
    dispatch(getCommentList(idDetail));
  }, [togglePostComment]);

  if (isLoading) return <LoadingAnimation />;

  return (
    <StyledMovieDetail>
      <DetailBanner hinhAnh={movieDetail.hinhAnh} />
      <div className="container">
        <div className="grid-layout">
          {/* Movie Detail */}
          <div className="column1">
            <div className="detail-info">
              <Image url={movieDetail.hinhAnh} alt="poster" className="detail-poster" />
              <DetailOverview data={movieDetail} />
            </div>
            <Tag kind="secondary" marginTop="14px">
              Tóm tắt phim
            </Tag>
            <Description lineHeight={"2"}>{movieDetail.moTa}</Description>
            {isMobile ? <DetailShowtimeMobile /> : <DetailShowtime />}
            <Tag kind="secondary" marginTop="14px">
              Đánh giá
            </Tag>
            <Comment />
            <AddComment />
          </div>
          {/* Related Post */}
          <div className="column2">
            <PostRelated />
          </div>
        </div>
      </div>
      <ModalTrailer />
    </StyledMovieDetail>
  );
};

// DỮ LIỆU MẪU TRẢ VỀ CỦA MOVIE DETAIL TỪ API
// {
//   "statusCode": 200,
//   "message": "Xử lý thành công!",
//   "content": {
//     "maPhim": 8189,
//     "tenPhim": "Lừa đểu gặp lừa đảo 3",
//     "biDanh": "lua-deu-gap-lua-dao-3",
//     "trailer": "https://www.youtube.com/embed/T36HGZagV5w",
//     "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/lua-deu-gap-lua-dao-3_gp13.jpg",
//     "moTa": "Lừa Đểu Gặp Lừa Đảo xoay quanh lần gặp gỡ oan gia giữa siêu lừa đảo Tower cùng cô nàng bị lừa tình Ina, cả 2 sẽ cùng hợp tác trong phi vụ lừa lại tên lừa đểu Petch - tên bạn trai bội bạc của Ina bằng những chiêu trò lừa đảo không hồi kết.",
//     "maNhom": "GP13",
//     "hot": false,
//     "dangChieu": true,
//     "sapChieu": false,
//     "ngayKhoiChieu": "2021-09-10T00:00:00",
//     "danhGia": 10
//   },
//   "dateTime": "2022-03-31T17:33:55.2292515+07:00",
//   "messageConstants": null
// }

export default MovieDetail;
