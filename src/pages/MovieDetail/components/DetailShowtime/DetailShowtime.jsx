import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
// utilities
import { formatDateToHours } from "utilities/formatDate";
import increaseDate from "utilities/increaseDate";
import "./detailShowtime.scss";
const arrDate = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

export const DetailShowtime = () => {
  const { calendarShowList } = useSelector((state) => state.movieDetail);
  const { TabPane } = Tabs;

  return (
    <div className='showtime-detail detail-showtime'>
      <h3 className='showtime-heading text--primary'>Lịch chiếu phim</h3>
      {calendarShowList ? (
        <div className='showtime-wrapper'>
          {calendarShowList.length !== 0 ? (
            <Tabs defaultActiveKey='0'>
              {calendarShowList.map((calendar, index) => (
                <TabPane
                  tab={
                    <div className='showtime-header'>
                      <p>{arrDate[new Date(calendar.date).getDay()]}</p>
                      <p>{new Date(calendar.date).toLocaleDateString("vi-VI")}</p>
                    </div>
                  }
                  key={index}
                >
                  <Tabs defaultActiveKey='0' tabPosition='left'>
                    {calendar.heThongRap.map((cinemaGroup, cinemaGroupIndex) => (
                      <TabPane
                        tab={
                          <img className='showtime-icon' src={cinemaGroup.logo} alt='cinema-logo' />
                        }
                        key={cinemaGroupIndex}
                      >
                        {cinemaGroup.cumRapChieu.map((cinema, cinemaIndex) => (
                          <div key={cinemaIndex}>
                            <h3>
                              {cinema.tenCumRap} (
                              {new Date(calendar.date).toLocaleDateString("vi-VI")})
                            </h3>
                            <div className='showtime-openday'>
                              {cinema.lichChieuPhim.map((showtime, showtimeIndex) => (
                                <Link
                                  key={showtimeIndex}
                                  to={`/booking/${showtime.maLichChieu}`}
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
                      </TabPane>
                    ))}
                  </Tabs>
                </TabPane>
              ))}
            </Tabs>
          ) : (
            "Phim này hiện chưa có lịch chiếu !"
          )}
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
};
