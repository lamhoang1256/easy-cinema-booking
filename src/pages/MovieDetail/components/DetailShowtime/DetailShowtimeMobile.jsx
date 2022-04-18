import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Collapse, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCinemaAction } from "redux/actions/movieCinema.action";
// utilities
import { formatDateToHours } from "utilities/formatDate";
import increaseDate from "utilities/increaseDate";
import "./detailShowtime.scss";
const arrDate = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

export const DetailShowtimeMobile = () => {
  const dispatch = useDispatch();
  const { dataCinema } = useSelector((state) => state.movieDetail);
  const { Panel } = Collapse;
  const { TabPane } = Tabs;

  useEffect(() => {
    dispatch(getCinemaAction());
  }, []);

  return (
    <div className='detail-showtime-mobile'>
      {dataCinema ? (
        <div>
          <h3 className='showtime-heading text--primary'>Lịch chiếu phim</h3>
          {dataCinema.length !== 0 ? (
            <div className='showtime-container'>
              {/* hệ thống rạp */}
              <Tabs defaultActiveKey='0' tabPosition='top'>
                {dataCinema.map((item, index) => (
                  <TabPane
                    tab={
                      <div className='showtime-openday'>
                        <p>{arrDate[new Date(item.date).getDay()]}</p>
                        <p>{new Date(item.date).toLocaleDateString("vi-VI")}</p>
                      </div>
                    }
                    key={index}
                  >
                    {/* tên hệ thống rạp*/}
                    <Collapse defaultActiveKey={["0"]}>
                      {/* tên cụm rạp */}
                      {item.heThongRap.map((cinemaItem, cinemaItemIndex) => (
                        <Panel
                          header={
                            <div className='showtime-mobile-logo'>
                              <img className='showtime-icon' src={cinemaItem.logo} />
                              <div>{cinemaItem.tenHeThongRap.toUpperCase()}</div>
                            </div>
                          }
                          key={cinemaItemIndex}
                        >
                          {/* danh sách thời điểm chiếu */}
                          {cinemaItem.cumRapChieu.map((movie, indexMovie) => (
                            <div key={indexMovie}>
                              <h3>{movie.tenCumRap}</h3>
                              <div className='showtime-openday'>
                                {movie.lichChieuPhim.map((openday, opendayIndex) => (
                                  <Link
                                    to={`/booking/${openday.maLichChieu}`}
                                    key={opendayIndex}
                                    className='showtime-openday-item'
                                  >
                                    <span className='showtime-openday-big'>
                                      {formatDateToHours(openday.ngayChieuGioChieu)}
                                    </span>
                                    <span> ~ </span>
                                    {formatDateToHours(
                                      increaseDate(openday.ngayChieuGioChieu, 7200000)
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
