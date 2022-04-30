import { useEffect, useState } from "react";
import { useMediaQuery } from "hooks/useMediaQuery";
// component
import { Carousel } from "./components/Carousel/Carousel";
import { FilterFilm } from "./components/FilterFilm/FilterFilm";
import { MovieList } from "./components/MovieList/MovieList";
import { Article } from "./components/Article/Article";
import { ModalTrailer } from "components/ModalTrailer/ModalTrailer";
import { Showtime } from "./components/Showtime/Showtime";
import { ShowtimeMobile } from "./components/Showtime/ShowtimeMobile";

import { moviesApi } from "apis/moviesApi";
import "./home.scss";

export const Home = () => {
  // kiểm tra xem người dùng đang ở điện thoại hay không để load giao diện cinema
  const isMobile = useMediaQuery("(max-width:767.98px)");
  const [comingSoonMovieList, setComingSoonMovieList] = useState(null);
  const [nowShowingMovieList, setNowShowingMovieList] = useState(null);
  const [showtimeList, setShowtimeList] = useState(null);

  // lấy danh sách phim sắp chiếu
  const fetchComingSoonMovieList = async () => {
    try {
      const { data } = await moviesApi.getMovieListApi("01");
      setComingSoonMovieList(data.content);
    } catch (err) {
      console.log(err);
    }
  };
  // lấy danh sách phim đang chiếu
  const fetchNowShowingMovieList = async () => {
    try {
      const { data } = await moviesApi.getMovieListApi("00");
      setNowShowingMovieList(data.content);
    } catch (err) {
      console.log(err);
    }
  };

  // lấy dữ liệu cụm rạp (lịch chiếu phim)
  const fetchCalendarShowtime = async () => {
    try {
      const { data } = await moviesApi.getCinemaApi("05");
      setShowtimeList(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchComingSoonMovieList();
    fetchNowShowingMovieList();
    fetchCalendarShowtime();
  }, []);

  return (
    <div className='home'>
      <div className='home-top'>
        <Carousel />
      </div>
      <div className='home-main'>
        <FilterFilm />
        <div className='container'>
          {/* Danh sách phim */}
          <MovieList data={comingSoonMovieList} heading='Phim sắp chiếu' col={5} />
          <MovieList data={nowShowingMovieList} heading='Phim đang chiếu' col={6} />
          {/* Phần Lịch chiếu phim */}
          <div id='showtime'>
            {isMobile ? (
              <ShowtimeMobile showtimeList={showtimeList} />
            ) : (
              <Showtime showtimeList={showtimeList} />
            )}
          </div>
          {/* Phần Tin tức */}
          <Article />
        </div>
      </div>
      <ModalTrailer />
    </div>
  );
};

// DỮ LIỆU MẪU TRẢ VỀ CỦA LIST MOVIE TỪ API
// {
//   "statusCode": 200,
//   "message": "Xử lý thành công!",
//   "content": [
//     {
//       "maPhim": 1506,
//       "tenPhim": "Southpaww 696",
//       "biDanh": "southpaww-696",
//       "trailer": "https://www.youtube.com/embed/Mh2ebPxhoLs",
//       "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/southpaw.jpg",
//       "moTa": "Boxer Billy Hope turns to trainer Tick Willis to help him ",
//       "maNhom": "GP13",
//       "ngayKhoiChieu": "2021-08-21T00:00:00",
//       "danhGia": 8,
//       "hot": true,
//       "dangChieu": false,
//       "sapChieu": true
//     },
//     {
//       "maPhim": 1521,
//       "tenPhim": "Specter 445",
//       "biDanh": "specter-445",
//       "trailer": "https://www.youtube.com/embed/LTDaET-JweU",
//       "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/southpaw.jpg",
//       "moTa": "A cryptic message from Bond's past sends him on a trail to ",
//       "maNhom": "GP13",
//       "ngayKhoiChieu": "2021-11-04T16:24:27.64",
//       "danhGia": 8,
//       "hot": true,
//       "dangChieu": true,
//       "sapChieu": false
//     },
//     ...
//   }
//]
