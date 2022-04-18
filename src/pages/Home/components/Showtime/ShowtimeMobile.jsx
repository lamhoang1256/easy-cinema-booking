import { Link } from "react-router-dom";
import { Collapse, Tabs } from "antd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// utilities
import { formatDateToHours } from "utilities/formatDate";
import increaseDate from "utilities/increaseDate";

export const ShowtimeMobile = ({ showtimeList }) => {
  const { Panel } = Collapse;
  const { TabPane } = Tabs;

  return (
    <div className='showtime-mobile'>
      <h2 className='showtime-heading text--primary'>Lịch chiếu phim</h2>
      {showtimeList ? (
        <div className='showtime-container'>
          {/* hệ thống rạp */}
          <Tabs defaultActiveKey='0' tabPosition='top'>
            {showtimeList.map((systemCinema, index) => (
              <TabPane tab={<img className='showtime-icon' src={systemCinema.logo} />} key={index}>
                {/* cụm rạp */}
                <Collapse defaultActiveKey={["0"]}>
                  {systemCinema.lstCumRap.map((cinema, index) => (
                    <Panel header={<p className='showtime-name'>{cinema.tenCumRap}</p>} key={index}>
                      {cinema.danhSachPhim.map((movie, indexMovie) => (
                        <div className='showtime-boxed' key={indexMovie}>
                          <div className='showtime-thumb'>
                            <img src={movie.hinhAnh} alt='showtime-movie' />
                          </div>
                          <div>
                            <h3 className='showtime-title'>{movie.tenPhim}</h3>
                            <span>2D Phụ đề</span>
                            <div className='showtime-openday'>
                              {movie.lstLichChieuTheoPhim.slice(0, 10).map((time, keyShowtime) => (
                                <Link
                                  to={`/booking/${time.maLichChieu}`}
                                  key={keyShowtime}
                                  className='showtime-openday-item'
                                >
                                  <span className='showtime-openday-big'>
                                    {formatDateToHours(time.ngayChieuGioChieu)}
                                  </span>
                                  <span> ~ </span>
                                  {formatDateToHours(increaseDate(time.ngayChieuGioChieu, 7200000))}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </Panel>
                  ))}
                </Collapse>
              </TabPane>
            ))}
          </Tabs>
        </div>
      ) : (
        <Skeleton height={400} />
      )}
    </div>
  );
};
