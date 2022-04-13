import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Collapse, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCinemaAction } from "redux/actions/movieCinema.action";
// import "./showtime.scss";

export const ShowtimeMobile = () => {
  const dispatch = useDispatch();
  const { dataCinema } = useSelector((state) => state.movieCinema);
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

  useEffect(() => {
    dispatch(getCinemaAction());
  }, []);

  return (
    <div className='showtime-mobile'>
      {dataCinema ? (
        <div className='container'>
          <h2 className='showtime-heading'>Lịch chiếu phim</h2>
          <div className='showtime-container'>
            {/* hệ thống rạp */}
            <Tabs defaultActiveKey='0' tabPosition='top'>
              {dataCinema.map((systemCinema, index) => (
                <TabPane
                  tab={<img className='showtime-icon' src={systemCinema.logo} />}
                  key={index}
                >
                  {/* cụm rạp */}
                  <Collapse defaultActiveKey={["0"]}>
                    {systemCinema.lstCumRap.map((cinema, index) => (
                      <Panel
                        header={<p className='showtime-name'>{cinema.tenCumRap}</p>}
                        key={index}
                      >
                        {cinema.danhSachPhim.map((movie, indexMovie) => (
                          <div className='showtime-boxed' key={indexMovie}>
                            <div className='showtime-thumb'>
                              <img src={movie.hinhAnh} alt='showtime-movie' />
                            </div>
                            <div>
                              <h3 className='showtime-title'>{movie.tenPhim}</h3>
                              <span>2D Phụ đề</span>
                              <div className='showtime-openday'>
                                {movie.lstLichChieuTheoPhim
                                  .slice(0, 10)
                                  .map((time, keyShowtime) => (
                                    <Link
                                      to={`/booking/${time.maLichChieu}`}
                                      key={keyShowtime}
                                      className='showtime-openday-item'
                                    >
                                      <span className='showtime-openday-big'>
                                        {formatDateToHour(time.ngayChieuGioChieu)}
                                      </span>
                                      <span> ~ </span>
                                      {formatDateToHour(
                                        increaseDate(time.ngayChieuGioChieu, 7200000)
                                      )}
                                    </Link>
                                  ))}
                              </div>
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
