import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCinemaAction } from "redux/actions/movieCinema.action";
import "./cinema.scss";

export const Cinema = () => {
  const dispatch = useDispatch();
  const { dataCinema } = useSelector((state) => state.movieCinema);
  console.log(dataCinema);
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
    <div className='cinema'>
      {dataCinema ? (
        <div className='container'>
          <h2 className='cinema-heading'>Lịch chiếu phim</h2>
          <div className='cinema-container'>
            {/* hệ thống rạp */}
            <Tabs defaultActiveKey='1' tabPosition='top'>
              {dataCinema.map((systemCinema, index) => (
                <TabPane tab={<img className='cinema-icon' src={systemCinema.logo} />} key={index}>
                  {/* cụm rạp */}
                  <Tabs defaultActiveKey='1' tabPosition='left'>
                    {systemCinema.lstCumRap.map((cinema, index) => (
                      <TabPane key={index} tab={<p className='cinema-name'>{cinema.tenCumRap}</p>}>
                        <div className='cinema-main'>
                          <div className='cinema-top'>
                            <h3 className='cinema-label'>Lịch chiếu phim {cinema.tenCumRap}</h3>
                            <p className='cinema-label'>Địa chỉ: {cinema.diaChi}</p>
                          </div>
                          {/* danh sách phim đang chiếu của rạp */}

                          {cinema.danhSachPhim.map((movie, indexMovie) => (
                            <div className='cinema-boxed' key={indexMovie}>
                              <div className='cinema-thumb'>
                                <img src={movie.hinhAnh} alt='cinema-movie' />
                              </div>
                              <div>
                                <h3 className='cinema-title'>{movie.tenPhim}</h3>
                                <span>2D Phụ đề</span>
                                <div className='cinema-showtime'>
                                  {movie.lstLichChieuTheoPhim
                                    .slice(0, 10)
                                    .map((time, keyShowtime) => (
                                      <Link
                                        to={`/booking/${time.maLichChieu}`}
                                        key={keyShowtime}
                                        className='cinema-showtime-item'
                                      >
                                        <span className='cinema-showtime-big'>
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
                        </div>
                      </TabPane>
                    ))}
                  </Tabs>
                </TabPane>
              ))}
            </Tabs>

            {/* <Tabs defaultActiveKey='1' tabPosition='left'>
            <TabPane
              tab={
                <img
                  className='cinema-icon'
                  src={`${process.env.REACT_APP_PUBLIC}/assets/images/cinema/cinema-mega.png`}
                />
              }
              key='1'
            >
              <Tabs defaultActiveKey='1' tabPosition='left'>
                <TabPane
                  tab={
                    <div className='cinema-boxed'>
                      <div className='cinema-boxed-img'>
                        <img
                          src={`${process.env.REACT_APP_PUBLIC}/assets/images/cinema/image-caothang.jpg`}
                          alt=''
                        />
                      </div>
                      <div className='cinema-boxed-info'>
                        <p>CGV - Aeon Bình Tân</p>
                        <p>Tầng 3, TTTM Aeon Mall Bình Tân, Số 1 đường </p>
                      </div>
                    </div>
                  }
                  key='1'
                >
                  <div className='cinema-boxed'>
                    <div className='cinema-boxed-img'>
                      <img
                        src={`${process.env.REACT_APP_PUBLIC}/assets/images/cinema/image-caothang.jpg`}
                        alt=''
                      />
                    </div>
                    <div className='cinema-boxed-info'>
                      <p>CGV - Aeon Bình Tân</p>
                      <p>Tầng 3, TTTM Aeon Mall Bình Tân, Số 1 đường </p>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab='Hai Bà Trưng' key='2'>
                  Raya Raya 120 phút - Điểm Tix 10 Thứ tư, 20 tháng 04, 2022 15:41 ~ 17:41
                </TabPane>
                <TabPane tab='Hoàn Kiếm' key='3'>
                  Người kiến Người Kiến 120 phút - Điểm Tix 10 Thứ sáu, 09 tháng 07, 2021
                </TabPane>
              </Tabs>
            </TabPane>

            <TabPane tab='Rạp 2' key='2'>
              <Tabs defaultActiveKey='1' tabPosition='left'>
                <TabPane tab='Tân Phú' key='1'>
                  John Wick John Wick 120 phút - Điểm Tix 10 Thứ ba, 22 tháng 02, 2022 19:33 ~ 21:33
                  Chủ nhật, 19 tháng 09, 2021 07:00 ~ 09:00 Thứ tư, 29 tháng 09, 2021 11:54 ~ 13:54
                  Thứ tư, 21 tháng 10, 2020 15:15 ~ 17:15
                </TabPane>
                <TabPane tab='Hai Bà Trưng' key='2'>
                  Raya Raya 120 phút - Điểm Tix 10 Thứ tư, 20 tháng 04, 2022 15:41 ~ 17:41
                </TabPane>
                <TabPane tab='Hoàn Kiếm' key='3'>
                  Người kiến Người Kiến 120 phút - Điểm Tix 10 Thứ sáu, 09 tháng 07, 2021
                </TabPane>
              </Tabs>
            </TabPane>

            <TabPane tab='Rạp 3' key='3'>
              <Tabs defaultActiveKey='1' tabPosition='left'>
                <TabPane tab='Tân Phú' key='1'>
                  John Wick John Wick 120 phút - Điểm Tix 10 Thứ ba, 22 tháng 02, 2022 19:33 ~ 21:33
                  Chủ nhật, 19 tháng 09, 2021 07:00 ~ 09:00 Thứ tư, 29 tháng 09, 2021 11:54 ~ 13:54
                  Thứ tư, 21 tháng 10, 2020 15:15 ~ 17:15
                </TabPane>
                <TabPane tab='Hai Bà Trưng' key='2'>
                  Raya Raya 120 phút - Điểm Tix 10 Thứ tư, 20 tháng 04, 2022 15:41 ~ 17:41
                </TabPane>
                <TabPane tab='Hoàn Kiếm' key='3'>
                  Người kiến Người Kiến 120 phút - Điểm Tix 10 Thứ sáu, 09 tháng 07, 2021
                </TabPane>
              </Tabs>
            </TabPane>
          </Tabs> */}
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
};
