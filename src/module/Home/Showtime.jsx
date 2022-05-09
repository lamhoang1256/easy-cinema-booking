import { Link } from "react-router-dom";
import { Tabs } from "antd";
import Skeleton from "react-loading-skeleton";
import { formatDateToHours } from "utilities/formatDate";
import { increaseTime } from "utilities/increaseTime";

export const Showtime = ({ showtimeList }) => {
  const { TabPane } = Tabs;
  return (
    <div className='showtime'>
      <h2 className='showtime-heading text--primary'>Lịch chiếu phim</h2>
      {showtimeList ? (
        <div className='showtime-container'>
          {/* hệ thống rạp */}
          <Tabs defaultActiveKey='0' tabPosition='top'>
            {showtimeList.map((systemCinema, index) => (
              <TabPane tab={<img className='showtime-icon' src={systemCinema.logo} />} key={index}>
                {/* cụm rạp */}
                <Tabs defaultActiveKey='0' tabPosition='left'>
                  {systemCinema.lstCumRap.map((cinema, index) => (
                    <TabPane key={index} tab={<p className='showtime-name'>{cinema.tenCumRap}</p>}>
                      <div className='showtime-main'>
                        <div className='showtime-top'>
                          <h3 className='showtime-label'>Lịch chiếu phim {cinema.tenCumRap}</h3>
                          <p className='showtime-label'>Địa chỉ: {cinema.diaChi}</p>
                        </div>

                        {/* danh sách phim đang chiếu của rạp */}
                        {cinema.danhSachPhim.map((movie, indexMovie) => (
                          <div className='showtime-boxed' key={indexMovie}>
                            <div className='showtime-thumb'>
                              <img src={movie.hinhAnh} alt='showtime-movie' />
                            </div>
                            <div>
                              <h3 className='showtime-title'>{movie.tenPhim}</h3>
                              <span>2D Phụ đề</span>
                              <div className='showtime-openday'>
                                {movie.lstLichChieuTheoPhim
                                  .slice(0, 10)
                                  .map((time, keyShowtime) => (
                                    <Link
                                      to={`/booking/${time.maLichChieu}`}
                                      key={keyShowtime}
                                      className='showtime-openday-item'
                                    >
                                      <span className='showtime-openday-big'>
                                        {formatDateToHours(time.ngayChieuGioChieu)}
                                      </span>
                                      <span> ~ </span>
                                      {formatDateToHours(
                                        increaseTime(time.ngayChieuGioChieu, 7200000)
                                      )}
                                    </Link>
                                  ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabPane>
                  ))}
                </Tabs>
              </TabPane>
            ))}
          </Tabs>
        </div>
      ) : (
        <Skeleton height={300} borderRadius={10} />
      )}
    </div>
  );
};

export default Showtime;
