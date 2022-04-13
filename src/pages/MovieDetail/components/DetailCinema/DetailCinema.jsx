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
                <TabPane tab={item.date} key={index}>
                  <Tabs defaultActiveKey='1'>
                    {item.heThongRap.map((cinema, cinemaIndex) => (
                      <TabPane
                        tab={<img className='cinema-icon' src={cinema.logo} />}
                        key={cinemaIndex}
                      >
                        Content of Tab Pane 1
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
