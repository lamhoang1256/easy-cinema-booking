import { moviesApi } from "apis/moviesApi";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DatePicker } from "antd";
import { Modal, Button } from "antd";
import { Table } from "antd";
import "./cinemaGroup.scss";
import { sweetAlert } from "utilities/sweetAlert";

// {
//   "maPhim": 0,
//   "ngayChieuGioChieu": "string",
//   "maRap": "string",
//   "giaVe": 0
// }

const CinemaGroup = () => {
  const { cinemaSystemId } = useParams();
  const cinemaSystemIdArray = cinemaSystemId?.split("-");
  const cinemaName = cinemaSystemIdArray.join("-");
  const cinemaSystemID = cinemaSystemIdArray.shift();

  const [isLoading, setIsLoading] = useState(true);
  const [cinemaGroup, setCinemaGroup] = useState();
  const [cinemaInfo, setCinemaInfo] = useState();
  const [movieList, setMovieList] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState({ tenPhim: "" });
  const [filmOpenday, setFilmOpenday] = useState();
  const [filmOpendayTime, setFilmOpendayTime] = useState();
  const [idCinema, setIdCinema] = useState();
  const [priceTicket, setPriceTicket] = useState();

  const showModal = (idCinema) => {
    setIdCinema(idCinema);
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleGetFilm = (filmSelected) => {
    setSelectedFilm(filmSelected);
  };

  const onChangeDatePicker = (date) => {
    if (!date) {
      setFilmOpenday("");
      return;
    }
    setFilmOpenday(moment(date).format("DD/MM/YYYY"));
  };

  const onChangeTimePicker = (time) => {
    if (!time) {
      setFilmOpendayTime("");
      return;
    }
    setFilmOpendayTime(moment(time).format("hh:mm:ss"));
  };

  // giaVe: "130000"
  // gioChieu: "2022-04-29T06:13:13.792Z"
  // maCumRap: "megags-cao-thang"
  // maPhim: 1855
  // maRap: 903
  // ngayChieu: "2022-04-13T08:15:53.320Z"
  // ngayChieuGioChieu: "13/04/2022 01:13:13"
  // tenRap: "Rạp 3"

  // maPhim	integer($int32)
  // ngayChieuGioChieu	string
  // maRap	string
  // giaVe	number($double)

  const handleAddShowtime = () => {
    if (!selectedFilm.maPhim || !filmOpenday || !filmOpendayTime || !priceTicket) {
      sweetAlert("error", "Thêm lịch chiếu thất bại!", "Vui lòng nhập đủ trường dữ liệu");
      return;
    }
    const requestAddShowtime = {
      maPhim: selectedFilm.maPhim,
      ngayChieuGioChieu: `${filmOpenday} ${filmOpendayTime}`,
      maRap: cinemaSystemId,
      giaVe: priceTicket,
    };
    console.log(requestAddShowtime);

    const addShowtime = async () => {
      try {
        const res = await moviesApi.createShowtime(requestAddShowtime);
        console.log(res);
        if (res.status === 200) {
          sweetAlert(
            "success",
            "Thêm lịch chiếu thành công!",
            "Bạn đã thêm mới lịch chiếu thành công"
          );
        }
      } catch (error) {
        console.log(error);
        console.log(error?.response?.data?.content);
        sweetAlert("error", "Thêm lịch chiếu thất bại!", error?.response?.data?.content);
      }
    };

    addShowtime();
  };

  const columns = [
    {
      title: "Mã rạp",
      dataIndex: "maRap",
      key: "maRap",
    },
    {
      title: "Tên rạp",
      dataIndex: "tenRap",
      key: "tenRap",
    },
    {
      title: "Action",
      dataIndex: "maRap",
      key: "action",
      render: (maRap) => <button onClick={() => showModal(maRap)}>Thêm lịch chiếu</button>,
    },
  ];

  useEffect(() => {
    const fetchCinemaGroup = async () => {
      setIsLoading(true);
      try {
        const { data } = await moviesApi.getCinemaGroupApi(cinemaSystemID);
        let dataHasKey = data.content.map((item, index) => {
          return {
            ...item,
            key: index,
          };
        });
        const cinema = dataHasKey.filter((cinemaList) => cinemaList.maCumRap == cinemaName);
        const { danhSachRap, ...infoCinema } = cinema[0];
        setCinemaInfo(infoCinema);
        const cinemaHasKey = danhSachRap.map((item, index) => {
          return { ...item, key: index };
        });
        setCinemaGroup(cinemaHasKey);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchCinemaGroup();
  }, []);

  useEffect(() => {
    const fetchMovieList = async () => {
      try {
        const { data } = await moviesApi.getMovieListApi("01");
        setMovieList(data.content);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovieList();
  }, []);

  useEffect(() => {
    setSelectedFilm({ tenPhim: "" });
  }, [movieList]);

  return (
    <>
      {isLoading && "Loading"}
      {!isLoading && (
        <>
          <h2>{cinemaInfo?.tenCumRap}</h2>
          <p>{cinemaInfo?.diaChi}</p>
          <Table columns={columns} dataSource={cinemaGroup} />
          <Modal
            title='Basic Modal'
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <h3>Chọn phim:</h3>
            <div className='filter-menu'>
              <div
                className='filter-select'
                onClick={(e) => {
                  setVisibility(!visibility);
                  e.currentTarget.children[0].children[1].innerHTML = visibility
                    ? "arrow_drop_down"
                    : "arrow_drop_up";
                }}
              >
                <div className='filter-selected-option'>
                  <span title={selectedFilm.tenPhim === "" ? "Chọn Phim" : selectedFilm.tenPhim}>
                    {selectedFilm.tenPhim === "" ? "Chọn Phim" : selectedFilm.tenPhim}
                  </span>
                  <ion-icon name='caret-down-outline'></ion-icon>
                </div>
                {/* Danh sách RẠP đang chiếu PHIM vừa chọn */}
                {visibility && (
                  <div className='filter-options'>
                    {movieList ? (
                      <ul>
                        {movieList.map((cinema, id) => (
                          <li
                            key={id}
                            className={selectedFilm === cinema ? "active-option" : null}
                            onClick={() => handleGetFilm(cinema)}
                          >
                            <img src={cinema.hinhAnh} className='cinema-group-thumb' alt='' />
                            <p>{cinema.tenPhim}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul>
                        <li>Vui lòng chọn phim</li>
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className='cinema-group-list'>
              <CinemaGroupField label='Chọn ngày'>
                <DatePicker onChange={onChangeDatePicker} format='DD/MM/YYYY' />
              </CinemaGroupField>

              <CinemaGroupField label='Chọn giờ khởi chiếu'>
                <DatePicker picker='time' onChange={onChangeTimePicker} />
              </CinemaGroupField>

              <CinemaGroupField label='Giá vé'>
                <input
                  type='number'
                  placeholder='Nhập giá vé'
                  className='cinema-group-price'
                  onChange={(e) => setPriceTicket(e.target.value)}
                />
              </CinemaGroupField>

              <CinemaGroupField label='Mã rạp'>
                <p>{idCinema}</p>
              </CinemaGroupField>
            </div>
            <button className='btn btn--primary' onClick={handleAddShowtime}>
              Thêm lịch chiếu
            </button>
          </Modal>
        </>
      )}
    </>
  );
};
// getCinemaGroupApi
export default CinemaGroup;

const CinemaGroupField = ({ label, children }) => (
  <div className='cinema-group-field'>
    <h3>{label}:</h3>
    {children}
  </div>
);
