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
    <div className='cinema-mobile'>
      {dataCinema ? (
        <div className='container'>
          <h2 className='cinema-heading'>Lịch chiếu phim</h2>
          <div className='cinema-container'>
            {/* hệ thống rạp */}
            <Tabs defaultActiveKey='1' tabPosition='top'>
              {dataCinema.heThongRapChieu.map((cinema, index) => (
                <TabPane tab={<img className='cinema-icon' src={cinema.logo} />} key={index}>
                  {/* cụm rạp */}
                  <Collapse defaultActiveKey={["1"]}>
                    {cinema.cumRapChieu.map((cinemaItem, cinemaItemIndex) => (
                      <Panel
                        header={<p className='cinema-name'>{cinemaItem.tenCumRap}</p>}
                        key={cinemaItemIndex}
                      >
                        {cinemaItem.lichChieuPhim.map((movie, indexMovie) => (
                          <div className='cinema-showtime' key={indexMovie}>
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
