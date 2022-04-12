import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCinemaAction } from "redux/actions/movieCinema.action";
// utilities
import formatDateToHour from "utilities/formatDateToHour";
import "./cinema.scss";

export const Cinema = () => {
  const dispatch = useDispatch();
  const { dataCinema } = useSelector((state) => state.movieCinema);
  const { TabPane } = Tabs;

  const increaseDate = (time, numSecondIncrease) => {
    const timestamp = new Date(time).getTime();
    const increaseTime = timestamp + numSecondIncrease;
    return increaseTime;
  };

  useEffect(() => {
    dispatch(getCinemaAction());
  }, []);

  return (
    <div className='cinema'>
      {dataCinema ? (
        <div className='container'>
          <h2 className='cinema-heading'>Lịch chiếu phim</h2>
          <div className='cinema-container'>
            {/* hệ thống rạp */}
            <Tabs defaultActiveKey='1' tabPosition='top'>
              {dataCinema.map((systemCinema, index) => (
                <TabPane tab={<img className='cinema-icon' src={systemCinema.logo} />} key={index}>
                  {/* cụm rạp */}
                  <Tabs defaultActiveKey='1' tabPosition='left'>
                    {systemCinema.lstCumRap.map((cinema, index) => (
                      <TabPane key={index} tab={<p className='cinema-name'>{cinema.tenCumRap}</p>}>
                        <div className='cinema-main'>
                          <div className='cinema-top'>
                            <h3 className='cinema-label'>Lịch chiếu phim {cinema.tenCumRap}</h3>
                            <p className='cinema-label'>Địa chỉ: {cinema.diaChi}</p>
                          </div>

                          {/* danh sách phim đang chiếu của rạp */}
                          {cinema.danhSachPhim.map((movie, indexMovie) => (
                            <div className='cinema-boxed' key={indexMovie}>
                              <div className='cinema-thumb'>
                                <img src={movie.hinhAnh} alt='cinema-movie' />
                              </div>
                              <div>
                                <h3 className='cinema-title'>{movie.tenPhim}</h3>
                                <span>2D Phụ đề</span>
                                <div className='cinema-showtime'>
                                  {movie.lstLichChieuTheoPhim
                                    .slice(0, 10)
                                    .map((time, keyShowtime) => (
                                      <Link
                                        to={`/booking/${time.maLichChieu}`}
                                        key={keyShowtime}
                                        className='cinema-showtime-item'
                                      >
                                        <span className='cinema-showtime-big'>
                                          {formatDateToHour(time.ngayChieuGioChieu)}
                                        </span>
                                        <span> ~ </span>
                                        {formatDateToHour(
                                          increaseDate(time.ngayChieuGioChieu, 7200000)
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
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
};
