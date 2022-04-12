import React, { useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCinemaAction } from "redux/actions/movieCinema.action";
// utilities
import formatDateToHour from "utilities/formatDateToHour";
import "./detailCinema.scss";
import { filterDayCinema } from "utilities/filterDayCinema";

export const DetailCinema = () => {
  const dispatch = useDispatch();
  const { dataCinema } = useSelector((state) => state.movieDetail);
  const { TabPane } = Tabs;

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }

  useEffect(() => {
    dispatch(getCinemaAction());
  }, []);

  return (
    <div className='detail-cinema'>
      {dataCinema ? (
        <div className='container'>
          <h2 className='detail-cinema-heading'>Lịch chiếu phim</h2>
          <div className='detail-cinema-container'>
            {/* hệ thống rạp */}
            <Tabs defaultActiveKey='1' tabPosition='top'>
              {dataCinema.heThongRapChieu.map((cinema, index) => (
                <TabPane tab={<img className='detail-cinema-icon' src={cinema.logo} />} key={index}>
                  {cinema.cumRapChieu.map((showtime, indexShowtime) => {
                    console.log(showtime);
                    return (
                      <Tabs defaultActiveKey='1' tabPosition='left'>
                        <TabPane tab={showtime.tenCumRap} key={indexShowtime}>
                          {filterDayCinema(showtime.lichChieuPhim)}
                        </TabPane>
                      </Tabs>
                    );
                  })}
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
