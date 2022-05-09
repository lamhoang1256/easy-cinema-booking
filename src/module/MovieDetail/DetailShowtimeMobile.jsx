import { Link } from "react-router-dom";
import { Collapse, Tabs } from "antd";
import { useSelector } from "react-redux";
import { formatDateToHours } from "utilities/formatDate";
import { increaseTime } from "utilities/increaseTime";
const arrDate = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

const DetailShowtimeMobile = () => {
  const { calendarShowList } = useSelector((state) => state.movieDetail);
  const { Panel } = Collapse;
  const { TabPane } = Tabs;

  return (
    <div className='detail-showtime-mobile'>
      <div>
        <h3 className='showtime-heading text--primary'>Lịch chiếu phim</h3>
        {calendarShowList?.length > 0 ? (
          <div className='showtime-container'>
            <Tabs defaultActiveKey='0' tabPosition='top'>
              {calendarShowList.map((calendar, index) => (
                <TabPane tab={<TabHeaderOpenday date={calendar.date} />} key={index}>
                  <Collapse defaultActiveKey={["0"]}>
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
                                    increaseTime(showtime.ngayChieuGioChieu, 7200000)
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
    </div>
  );
};

const TabHeaderOpenday = ({ date }) => (
  <div className='showtime-openday'>
    <p>{arrDate[new Date(date).getDay()]}</p>
    <p>{new Date(date).toLocaleDateString("vi-VI")}</p>
  </div>
);

export default DetailShowtimeMobile;
