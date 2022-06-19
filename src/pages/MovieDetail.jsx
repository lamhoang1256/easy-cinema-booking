import axios from "axios";
import DetailBanner from "module/detail/DetailBanner";
import DetailCasts from "module/detail/DetailCasts";
import DetailHeader from "module/detail/DetailHeader";
import DetailOverview from "module/detail/DetailOverview";
import DetailTrailer from "module/detail/DetailTrailer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const StyledMovieDetail = styled.div`
  .heading-sub {
    margin: 20px 0 10px;
  }
  .tag {
    color: rgb(150, 146, 199);
    font-size: 1.8rem;
    font-weight: 500;
  }
`;

const MovieDetail = () => {
  const { idDetail } = useParams();
  console.log(idDetail);
  const [detail, setDetail] = useState();

  const fetchMovieList = async () => {
    try {
      const { data } = await axios.get(
        "https://roxy-cinema-api.herokuapp.com/api/movies/" + idDetail
      );
      setDetail(data.data.movie);
      console.log(data.data.movie);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMovieTMDB = async () => {
    try {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/movie/675353?api_key=95f2419536f533cdaa1dadf83c606027&language=en-US"
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovieList();
    fetchMovieTMDB();
  }, []);

  return (
    <StyledMovieDetail>
      <DetailBanner
        hinhAnh={"https://image.tmdb.org/t/p/original/egoyMDLqCxzjnSrWOz50uLlJWmD.jpg"}
      />
      <div className="container">
        <DetailHeader data={detail} />
        <DetailOverview />
        <DetailCasts />
        <DetailTrailer />
      </div>
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
