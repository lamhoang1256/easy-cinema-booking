import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Collapse, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCinemaAction } from "redux/actions/movieCinema.action";
// utilities
import formatDateToHour from "utilities/formatDateToHour";
import increaseDate from "utilities/increaseDate";

import "./detailCinema.scss";
const arrDate = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

export const ShowtimeMobile = () => {
  const dispatch = useDispatch();
  const { dataCinema } = useSelector((state) => state.movieDetail);
  const { Panel } = Collapse;
  const { TabPane } = Tabs;

  useEffect(() => {
    dispatch(getCinemaAction());
  }, []);

  return (
    <div className='cinema-mobile'>
      {dataCinema ? (
        <div>
          <h2 className='cinema-heading'>Lịch chiếu phim</h2>
          {dataCinema.length !== 0 ? (
            <div className='cinema-container'>
              {/* hệ thống rạp */}
              <Tabs defaultActiveKey='1' tabPosition='top'>
                {dataCinema.map((item, index) => (
                  <TabPane
                    tab={
                      <div>
                        <p>{arrDate[new Date(item.date).getDay()]}</p>
                        <p>{new Date(item.date).toLocaleDateString("vi-VI")}</p>
                      </div>
                    }
                    key={index}
                  >
                    {/* tên hệ thống rạp*/}
                    <Collapse defaultActiveKey={["1"]}>
                      {/* tên cụm rạp */}
                      {item.heThongRap.map((cinemaItem, cinemaItemIndex) => (
                        <Panel
                          header={
                            <div className='cinema-mobile-logo'>
                              <img className='cinema-icon' src={cinemaItem.logo} />
                              <span>{cinemaItem.tenHeThongRap.toUpperCase()}</span>
                            </div>
                          }
                          key={cinemaItemIndex}
                        >
                          {/* danh sách thời điểm chiếu */}
                          {cinemaItem.cumRapChieu.map((movie, indexMovie) => (
                            <div key={indexMovie}>
                              <h3>{movie.tenCumRap}</h3>
                              <div className='cinema-showtime'>
                                {movie.lichChieuPhim.map((showtime, showtimeIndex) => (
                                  <Link
                                    to={`/booking/${showtime.maLichChieu}`}
                                    key={showtimeIndex}
                                    className='cinema-showtime-item'
                                  >
                                    <span className='cinema-showtime-big'>
                                      {formatDateToHour(showtime.ngayChieuGioChieu)}
                                    </span>
                                    <span> ~ </span>
                                    {formatDateToHour(
                                      increaseDate(showtime.ngayChieuGioChieu, 7200000)
                                    )}
                                  </Link>
                                ))}
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
            "Phim này hiện chưa có lịch chiếu!"
          )}
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
};
