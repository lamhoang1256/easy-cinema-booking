import React, { useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCinemaAction } from "redux/actions/movieCinema.action";
// utilities
import formatDateToHour from "utilities/formatDateToHour";
import "./detailCinema.scss";

export const DetailCinema = () => {
  const dispatch = useDispatch();
  const { dataCinema } = useSelector((state) => state.movieDetail);
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
    <div className='cinema cinema-detail'>
      {dataCinema ? (
        <div className='container'>
          <h2 className='cinema-heading'>Lịch chiếu phim</h2>
          <div className='cinema-container'>
            {/* hệ thống rạp */}
            <Tabs defaultActiveKey='1' tabPosition='top'>
              {dataCinema.heThongRapChieu.map((cinema, index) => (
                <TabPane tab={<img className='cinema-icon' src={cinema.logo} />} key={index}>
                  <Tabs defaultActiveKey='1' tabPosition='left'>
                    {cinema.cumRapChieu.map((cinemaItem, cinemaItemIndex) => (
                      <TabPane
                        key={cinemaItemIndex}
                        tab={<p className='cinema-name'>{cinemaItem.tenCumRap}</p>}
                      >
                        <div className='cinema-main'>
                          <div className='cinema-detail-main'>
                            {cinemaItem.lichChieuPhim.map((movie, indexMovie) => (
                              <div className='cinema-showtime'>
                                <Link
                                  to={`/booking/${movie.maLichChieu}`}
                                  className='cinema-showtime-item'
                                >
                                  <span className='cinema-showtime-big'>
                                    {`${new Date(movie.ngayChieuGioChieu).toLocaleDateString(
                                      "vi-VI"
                                    )} lúc ${formatDateToHour(movie.ngayChieuGioChieu)} (${
                                      movie.tenRap
                                    })`}
                                  </span>
                                </Link>
                              </div>
                            ))}
                          </div>
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

// let arrDay = [];
// showtime.lichChieuPhim.map((openday) => {
//   // arrDay.push(moment(openday.ngayChieuGioChieu).utc().format("DD/MM/YYYY"));
//   // console.log(openday.ngayChieuGioChieu.split("T")[0]);
//   // arrDay.push(openday.ngayChieuGioChieu);
//   arrDay.push(openday.ngayChieuGioChieu.split("T")[0]);
// });
// return [...new Set(arrDay)]
//   .sort((a, b) => a - b)
//   .map((item, index) => {
//     // return <div key={index}>{new Date(item).getDay()}</div>;
//     return <div key={index}>{item}</div>;
//   });
