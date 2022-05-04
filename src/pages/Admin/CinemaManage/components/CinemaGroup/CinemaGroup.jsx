import React, { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { DatePicker, Modal, Table } from "antd";
import Filter from "components/Filter/Filter";
import { moviesApi } from "apis/moviesApi";
import { sweetAlert } from "utilities/sweetAlert";
import { createKeyForObj } from "utilities/createKeyForObject";
import "./cinemaGroup.scss";

const CinemaGroup = () => {
  const { cinemaSystem, cinemaName } = useParams(); // cgv/cgv-hoang-van-thu
  const [isLoading, setIsLoading] = useState(true);

  const [movieList, setMovieList] = useState([]);
  const [cinemaGroup, setCinemaGroup] = useState([]);
  const [idCinema, setIdCinema] = useState("");
  const [cinemaInfo, setCinemaInfo] = useState({});

  // dropdown select film
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState({ tenPhim: "" });

  const [filmOpenday, setFilmOpenday] = useState("");
  const [filmOpendayTime, setFilmOpendayTime] = useState("");
  const [priceTicket, setPriceTicket] = useState("");

  const onShowModal = (idCinema) => {
    setIdCinema(idCinema);
    setIsModalVisible(true);
  };
  const onCancelModal = () => {
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

  const handleAddShowtime = () => {
    if (!selectedFilm.maPhim || !filmOpenday || !filmOpendayTime || !priceTicket) {
      sweetAlert("error", "Thêm lịch chiếu thất bại!", "Vui lòng nhập đủ trường dữ liệu");
      return;
    }
    const requestAddShowtime = {
      maPhim: selectedFilm.maPhim,
      ngayChieuGioChieu: `${filmOpenday} ${filmOpendayTime}`,
      maRap: cinemaName,
      giaVe: priceTicket,
    };
    (async () => {
      try {
        const response = await moviesApi.createShowtime(requestAddShowtime);
        if (response) {
          sweetAlert(
            "success",
            "Thêm lịch chiếu thành công!",
            "Bạn đã thêm mới lịch chiếu thành công"
          );
        }
      } catch (error) {
        sweetAlert("error", "Thêm lịch chiếu thất bại!", error?.response?.data?.content);
      }
    })();
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
      render: (maRap) => (
        <button className='btn btn--info' onClick={() => onShowModal(maRap)}>
          Thêm lịch chiếu
        </button>
      ),
    },
  ];

  useEffect(() => {
    const fetchCinemaGroup = async () => {
      setIsLoading(true);
      try {
        // Eg: get all cinema cgv -> cgv-vincom-thu-duc, cgv-vivocity, ...
        const { data } = await moviesApi.getCinemaGroupApi(cinemaSystem);
        const cinemaList = createKeyForObj(data.content);
        // get cinema has name same cinemaName in url
        const cinema = cinemaList.filter((cinema) => cinema.maCumRap == cinemaName);
        const { danhSachRap, ...infoCinema } = cinema[0];
        setCinemaInfo(infoCinema);
        const cinemaHasKey = createKeyForObj(danhSachRap);
        setCinemaGroup(cinemaHasKey);
        setIsLoading(false);
      } catch (error) {
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
    <div className='cinema-group'>
      {isLoading && "Loading"}
      {!isLoading && (
        <>
          <h2>Cụm rạp: {cinemaInfo?.tenCumRap}</h2>
          <p>Địa chỉ: {cinemaInfo?.diaChi}</p>
          <Table columns={columns} dataSource={cinemaGroup} style={{ marginTop: "20px" }} />
          <Modal
            title='Thêm lịch chiếu mới'
            visible={isModalVisible}
            onCancel={onCancelModal}
            footer={null}
          >
            <h3>Chọn phim:</h3>
            <Filter
              onChange={handleGetFilm}
              labelNotSelectItem='Chọn Phim'
              selectedItem={selectedFilm.tenPhim}
            >
              {movieList.length > 0 ? (
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
            </Filter>

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
            <button
              className='btn btn--primary'
              onClick={handleAddShowtime}
              style={{ marginTop: "20px", padding: "14px 20px" }}
            >
              Thêm lịch chiếu
            </button>
          </Modal>
        </>
      )}
    </div>
  );
};

const CinemaGroupField = ({ label, children }) => (
  <div className='cinema-group-field'>
    <h3>{label}:</h3>
    {children}
  </div>
);

export default CinemaGroup;
