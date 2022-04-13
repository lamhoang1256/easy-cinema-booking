import React, { useEffect } from "react";
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
  console.log(dataCinema);
  const { TabPane } = Tabs;

  const increaseDate = (time, numSecondIncrease) => {
    const timestamp = new Date(time).getTime();
    const increaseTime = timestamp + numSecondIncrease;
    return increaseTime;
  };

  const arrDate = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

  useEffect(() => {
    dispatch(getCinemaAction());
  }, []);

  return (
    <div className='cinema-detail'>
      {dataCinema ? (
        <div className='container'>
          <h2 className='cinema-heading'>Lịch chiếu phim</h2>
          <div className='cinema-wrapper'>
            <Tabs defaultActiveKey='1'>
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
                  <Tabs defaultActiveKey='1' tabPosition='left'>
                    {item.heThongRap.map((cinema, cinemaIndex) => (
                      <TabPane
                        tab={<img className='cinema-icon' src={cinema.logo} />}
                        key={cinemaIndex}
                      >
                        {cinema.cumRapChieu.map((cinemaItem, cinemaItemIndex) => (
                          <div key={cinemaItemIndex}>
                            <h3>{cinemaItem.tenCumRap}</h3>
                            <div className='cinema-showtime'>
                              {cinemaItem.lichChieuPhim.map((item, itemIndex) => (
                                // <div key={itemIndex}>{item.ngayChieuGioChieu}</div>
                                <Link
                                  to={`/booking/${item.maLichChieu}`}
                                  key={itemIndex}
                                  className='cinema-showtime-item'
                                >
                                  <span className='cinema-showtime-big'>
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
