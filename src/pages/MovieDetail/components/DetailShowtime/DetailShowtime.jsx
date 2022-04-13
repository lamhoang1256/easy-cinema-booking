import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCinemaAction } from "redux/actions/movieCinema.action";
// utilities
import formatDateToHour from "utilities/formatDateToHour";
import increaseDate from "utilities/increaseDate";
import "./detailShowtime.scss";
const arrDate = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

export const DetailShowtime = () => {
  const dispatch = useDispatch();
  const { dataCinema } = useSelector((state) => state.movieDetail);
  const { TabPane } = Tabs;

  useEffect(() => {
    dispatch(getCinemaAction());
  }, []);

  return (
    <div className='showtime-detail detail-showtime'>
      <h3 className='showtime-heading'>Lịch chiếu phim</h3>
      {dataCinema ? (
        <div className='showtime-wrapper'>
          {dataCinema.length !== 0 ? (
            <Tabs defaultActiveKey='0'>
              {dataCinema.map((item, index) => (
                <TabPane
                  tab={
                    <div className='showtime-header'>
                      <p>{arrDate[new Date(item.date).getDay()]}</p>
                      <p>{new Date(item.date).toLocaleDateString("vi-VI")}</p>
                    </div>
                  }
                  key={index}
                >
                  <Tabs defaultActiveKey='0' tabPosition='left'>
                    {item.heThongRap.map((cinema, cinemaIndex) => (
                      <TabPane
                        tab={<img className='showtime-icon' src={cinema.logo} alt='cinema-logo' />}
                        key={cinemaIndex}
                      >
                        {cinema.cumRapChieu.map((cinemaItem, cinemaItemIndex) => (
                          <div key={cinemaItemIndex}>
                            <h3>
                              {cinemaItem.tenCumRap} (
                              {new Date(item.date).toLocaleDateString("vi-VI")})
                            </h3>
                            <div className='showtime-openday'>
                              {cinemaItem.lichChieuPhim.map((item, itemIndex) => (
                                <Link
                                  to={`/booking/${item.maLichChieu}`}
                                  key={itemIndex}
                                  className='showtime-openday-item'
                                >
                                  <span className='showtime-openday-big'>
                                    {formatDateToHour(item.ngayChieuGioChieu)}
                                  </span>
                                  <span> ~ </span>
                                  {formatDateToHour(increaseDate(item.ngayChieuGioChieu, 7200000))}
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
