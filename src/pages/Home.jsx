import { useEffect, useState } from "react";
import { useMediaQuery } from "hooks/useMediaQuery";
import HomeBanner from "module/Home/HomeBanner";
import HomeFilter from "module/Home/HomeFilter/";
import MovieList from "components/movie/MovieList";
import HomeOpening from "module/Home/HomeOpening";
import HomeOpeningMobile from "module/Home/HomeOpeningMobile";
import HomeFeature from "module/Home/HomeFeature";
import { moviesApi } from "apis/moviesApi";

const Home = () => {
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
    fetchComingSoonMovieList();
    fetchNowShowingMovieList();
    fetchCalendarShowtime();
  }, []);

  return (
    <div className="home">
      <div className="home-top">
        {/* <Carousel /> */}
        <HomeBanner />
      </div>
      <div className="home-main">
        <HomeFilter />
        <div className="container">
          <MovieList data={comingSoonMovieList} heading="Phim sắp chiếu" />
          <MovieList data={nowShowingMovieList} heading="Phim đang chiếu" />
          <div id="showtime">
            {isMobile ? (
              <HomeOpeningMobile showtimeList={showtimeList} />
            ) : (
              <HomeOpening showtimeList={showtimeList} />
            )}
          </div>
          <HomeFeature />
        </div>
      </div>
    </div>
  );
};

export default Home;

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
