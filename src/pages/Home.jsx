import axios from "axios";
import MovieList from "components/movie/MovieList";
import HomeBanner from "module/home/HomeBanner";
import HomeFeature from "module/home/HomeFeature";
import HomeFilter from "module/home/HomeFilter";
import { useEffect, useState } from "react";

const Home = () => {
  const [movieList, setMovieList] = useState([]);

  const fetchMovieList = async () => {
    try {
      const { data } = await axios.get("https://roxy-cinema-api.herokuapp.com/api/movies/all");
      setMovieList(data.data.movies);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovieList();
  }, []);

  return (
    <div className="home">
      <div className="home-top">
        <HomeBanner />
      </div>
      <div className="home-main">
        <HomeFilter />
        <div className="container">
          <MovieList data={movieList} heading="Phim sắp chiếu" />
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
