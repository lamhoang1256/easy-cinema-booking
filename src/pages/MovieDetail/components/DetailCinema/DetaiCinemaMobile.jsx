import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Collapse, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCinemaAction } from "redux/actions/movieCinema.action";
import "./detailCinema.scss";

export const DetailCinemaMobile = () => {
  const dispatch = useDispatch();
  const { dataCinema } = useSelector((state) => state.movieDetail);

  console.log(dataCinema);

  const { Panel } = Collapse;
  const { TabPane } = Tabs;

  const increaseDate = (time, numSecondIncrease) => {
    const timestamp = new Date(time).getTime();
    const increaseTime = timestamp + numSecondIncrease;
    return increaseTime;
  };

  const formatDateToHour = (time) => {
    const formatDate = new Date(time).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return formatDate;
  };
  const arrDate = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

  useEffect(() => {
    dispatch(getCinemaAction());
  }, []);

  return (
    <div className='cinema-mobile'>
      {dataCinema ? (
        <div className='container'>
          <h2 className='cinema-heading'>Lịch chiếu phim</h2>
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
                  {/* cụm rạp */}
                  <Collapse defaultActiveKey={["1"]}>
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
                        {cinemaItem.cumRapChieu.map((movie, indexMovie) => (
                          <div key={indexMovie}>
                            <h3>{movie.tenCumRap}</h3>
                            <div className='cinema-showtime'>
                              {movie.lichChieuPhim.map((item, itemIndex) => (
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
                      </Panel>
                    ))}
                  </Collapse>
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

{
  /* <Collapse defaultActiveKey={["1"]}>
  <Panel header='This is panel header 1' key='1'>
    <p>{text}</p>
  </Panel>
</Collapse> */
}
{
  /* {dataCinema ? (
    <Collapse defaultActiveKey={["1"]}>
      <Panel header='This is panel header 1' key='1'>
        <p>{text}</p>
      </Panel>
      <Panel header='This is panel header 2' key='2'>
        <p>{text}</p>
      </Panel>
      <Panel header='This is panel header 3' key='3'>
        <p>{text}</p>
      </Panel>
    </Collapse>
  ) : (
    "Loading"
  )} */
}
