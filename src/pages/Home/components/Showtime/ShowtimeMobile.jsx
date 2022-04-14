import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Collapse, Tabs } from "antd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { getCinemaAction } from "redux/actions/movieCinema.action";
// utilities
import formatDateToHour from "utilities/formatDateToHour";
import increaseDate from "utilities/increaseDate";

export const ShowtimeMobile = () => {
  const dispatch = useDispatch();
  const { dataCinema } = useSelector((state) => state.movieCinema);
  const { Panel } = Collapse;
  const { TabPane } = Tabs;

  useEffect(() => {
    dispatch(getCinemaAction());
  }, []);

  return (
    <div className='showtime-mobile'>
      <h2 className='showtime-heading'>Lịch chiếu phim</h2>
      {dataCinema ? (
        <div className='showtime-container'>
          {/* hệ thống rạp */}
          <Tabs defaultActiveKey='0' tabPosition='top'>
            {dataCinema.map((systemCinema, index) => (
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
                                    {formatDateToHour(time.ngayChieuGioChieu)}
                                  </span>
                                  <span> ~ </span>
                                  {formatDateToHour(increaseDate(time.ngayChieuGioChieu, 7200000))}
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
