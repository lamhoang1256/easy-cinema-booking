import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddComment from "components/AddComment/AddComment";
import LoadingAnimation from "components/LoadingAnimation/LoadingAnimation";
import ModalTrailer from "components/ModalTrailer/ModalTrailer";
import PostRelated from "components/post/PostRelated";
import DetailComment from "module/detail/DetailComment";
import DetailOpening from "module/detail/DetailOpening";
import {
  getCalendarShowMovieDetail,
  getCommentList,
  getMovieDetail,
} from "redux/actions/movieDetail.action";
import Image from "components/image/Image";
import Section from "components/section/Section";
import Tag from "components/tag/Tag";
import Description from "components/text/Description";
import DetailBanner from "module/detail/DetailBanner";
import DetailOverview from "module/detail/DetailOverview";

const StyledMovieDetail = styled.div`
  .grid-layout {
    display: flex;
    gap: 20px;
    padding-top: 20px;
  }
  .column1 {
    width: 65%;
  }
  .column2 {
    width: 35%;
    padding-top: 20px;
  }
  .detail-poster {
    width: 160px;
    border-radius: 10px;
    aspect-ratio: 2/3;
    object-fit: cover;
  }
  .detail-info {
    margin-top: 14px;
    display: flex;
    gap: 20px 30px;
  }
  .detail-trailer {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
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
    .detail-info {
      flex-direction: column;
    }
  }
`;

const MovieDetail = () => {
  const { idDetail } = useParams();
  const dispatch = useDispatch();
  const { isLoading, movieDetail, togglePostComment } = useSelector((state) => state.movieDetail);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getMovieDetail(idDetail));
    dispatch(getCalendarShowMovieDetail(idDetail));
  }, []);
  useEffect(() => {
    dispatch(getCommentList(idDetail));
  }, [togglePostComment]);

  if (isLoading) return <LoadingAnimation />;

  const { hinhAnh, trailer, moTa } = movieDetail;
  const arraySplited = trailer.split("/");
  const embedId = arraySplited[arraySplited.length - 1];
  return (
    <StyledMovieDetail>
      <DetailBanner hinhAnh={hinhAnh} />
      <div className="container">
        <div className="grid-layout">
          {/* Movie Detail */}
          <div className="column1">
            <Section>
              <Tag kind="secondary" marginTop="14px">
                Chi tiết phim
              </Tag>
              <div className="detail-info">
                <Image url={hinhAnh} alt="poster" className="detail-poster" />
                <DetailOverview data={movieDetail} />
              </div>
            </Section>
            <Section>
              <Tag kind="secondary" marginTop="14px">
                Tóm tắt phim
              </Tag>
              <Description lineHeight={"2"}>{moTa}</Description>
            </Section>
            <Section>
              <iframe
                className="detail-trailer"
                src={`https://www.youtube.com/embed/${embedId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Section>
            <Section>
              <DetailOpening />
            </Section>
            <Section>
              <Tag kind="secondary" marginTop="14px">
                Đánh giá
              </Tag>
              <DetailComment />
              <AddComment />
            </Section>
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
