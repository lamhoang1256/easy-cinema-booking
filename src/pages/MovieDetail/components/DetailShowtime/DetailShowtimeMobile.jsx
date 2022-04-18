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
  const { calendarShowList } = useSelector((state) => state.movieDetail);
  const { Panel } = Collapse;
  const { TabPane } = Tabs;

  useEffect(() => {
    dispatch(getCinemaAction());
  }, []);

  return (
    <div className='detail-showtime-mobile'>
      {calendarShowList ? (
        <div>
          <h3 className='showtime-heading text--primary'>Lịch chiếu phim</h3>
          {calendarShowList.length !== 0 ? (
            <div className='showtime-container'>
              {/* hệ thống rạp */}
              <Tabs defaultActiveKey='0' tabPosition='top'>
                {calendarShowList.map((calendar, index) => (
                  <TabPane
                    tab={
                      <div className='showtime-openday'>
                        <p>{arrDate[new Date(calendar.date).getDay()]}</p>
                        <p>{new Date(calendar.date).toLocaleDateString("vi-VI")}</p>
                      </div>
                    }
                    key={index}
                  >
                    {/* tên hệ thống rạp*/}
                    <Collapse defaultActiveKey={["0"]}>
                      {/* tên cụm rạp */}
                      {calendar.heThongRap.map((cinemaGroup, cinemaGroupIndex) => (
                        <Panel
                          header={
                            <div className='showtime-mobile-logo'>
                              <img className='showtime-icon' src={cinemaGroup.logo} />
                              <div>{cinemaGroup.tenHeThongRap.toUpperCase()}</div>
                            </div>
                          }
                          key={cinemaGroupIndex}
                        >
                          {/* danh sách thời điểm chiếu */}
                          {cinemaGroup.cumRapChieu.map((cinema, cinemaIndex) => (
                            <div key={cinemaIndex}>
                              <h3>{cinema.tenCumRap}</h3>
                              <div className='showtime-openday'>
                                {cinema.lichChieuPhim.map((showtime, showtimeIndex) => (
                                  <Link
                                    to={`/booking/${showtime.maLichChieu}`}
                                    key={showtimeIndex}
                                    className='showtime-openday-item'
                                  >
                                    <span className='showtime-openday-big'>
                                      {formatDateToHours(showtime.ngayChieuGioChieu)}
                                    </span>
                                    <span> ~ </span>
                                    {formatDateToHours(
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
