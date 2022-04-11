import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs } from "antd";
import { useMediaQuery } from "hooks/useMediaQuery";
// component
import { Carousel } from "./components/Carousel/Carousel";
import { FilterBooking } from "./components/FilterBooking/FilterBooking";
import { MovieList } from "./components/MovieList/MovieList";
import { Article } from "./components/Article/Article";
import { ModalTrailer } from "components/ModalTrailer/ModalTrailer";
import { Cinema } from "./components/Cinema/Cinema";
import { CinemaMobile } from "./components/Cinema/CinemaMobile";
// action
import { getMovieListAction } from "redux/actions/movieList.action";
import "./homePage.scss";

export const HomePage = () => {
  // window.scrollTo(0, 0);
  // kiểm tra xem người dùng đang ở điện thoại hay không để load giao diện cinema
  const isMobile = useMediaQuery("(max-width:767.98px)");

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.movieList);

  // tab antd
  const { TabPane } = Tabs;
  useEffect(() => {
    dispatch(getMovieListAction());
  }, []);

  return (
    <div className='homePage'>
      <div className='homePage-top'>
        <Carousel />
      </div>
      <div className='homePage-main'>
        {isMobile ? <CinemaMobile /> : <Cinema />}

        <FilterBooking />
        <div className='container'>
          {/* Tab danh sách phim */}
          {!loading ? (
            <div className='homePage-tab'>
              <Tabs defaultActiveKey='1'>
                <TabPane tab='Đang chiếu' key='1'>
                  <MovieList listMovie={data.isShowingMovie} />
                </TabPane>
                <TabPane tab='Sắp chiếu' key='2'>
                  <MovieList listMovie={data.comingSoonMovie} />
                </TabPane>
                <TabPane tab='Đang hot' key='3'>
                  <MovieList listMovie={data.hotMovie} />
                </TabPane>
              </Tabs>
            </div>
          ) : (
            "Loading"
          )}

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
