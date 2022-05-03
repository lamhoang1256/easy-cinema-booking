import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { moviesApi } from "apis/moviesApi";
import moment from "moment";
import { createKeyForObj } from "utilities/createKeyForObject";
// import "./cinemaManage.scss";

const ScheduleFilm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [infoMovie, setInfoMovie] = useState({});
  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    const fetchCinemaManage = async () => {
      setIsLoading(true);
      try {
        const { data } = await moviesApi.getCalendarShowApi("1435");
        const { heThongRapChieu, ...movie } = data.content;
        const scheduleListHasKey = createKeyForObj(heThongRapChieu);
        // console.log(scheduleListHasKey);
        let cinemaList = [];
        scheduleListHasKey.forEach((element) => {
          element.cumRapChieu.forEach((item) => cinemaList.push(item));
        });
        cinemaList = createKeyForObj(cinemaList);
        // console.log(scheduleListHasKey);
        console.log(cinemaList);
        setScheduleList(cinemaList);
        setInfoMovie(movie);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchCinemaManage();
  }, []);

  const expandedRowRender = (row) => {
    // giaVe: 75000;
    // maLichChieu: "22634";
    // maRap: "588";
    // ngayChieuGioChieu: "2019-01-01T12:10:00";
    // tenRap: "Rạp 8";
    // thoiLuong: 120;
    const cinemaHasKey = createKeyForObj(row.lichChieuPhim);
    console.log(cinemaHasKey);
    const columnsCinema = [
      {
        title: " Mã rạp",
        dataIndex: "maRap",
        key: "maRap",
      },
      { title: "Tên rạp", dataIndex: "tenRap", key: "tenRap" },
      {
        title: "Ngày chiếu",
        dataIndex: "ngayChieuGioChieu",
        key: "ngayChieuGioChieu",
        render: (ngayChieuGioChieu) => moment(ngayChieuGioChieu).format("lll"),
      },
      {
        title: "Giá vé",
        dataIndex: "giaVe",
        key: "giaVe",
      },
      {
        title: "Lịch chiếu",
        dataIndex: "maLichChieu",
        key: "maLichChieu",
        render: (maLichChieu) => (
          <Link to={`/admin/movie-manage/seat-map/${maLichChieu}`}>
            <button className='btn btn--info'>Lịch chiếu</button>
          </Link>
        ),
      },
    ];

    return (
      <>
        <Table
          columns={columnsCinema}
          dataSource={cinemaHasKey}
          pagination={false}
          expandable={expandedRowRender}
        />
      </>
    );
  };

  const columns = [
    {
      title: "Tên cụm rạp",
      dataIndex: "tenCumRap",
      key: "tenCumRap",
    },
    {
      title: "Logo",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (hinhAnh) => <img src={hinhAnh} alt='logo' className='cinema-list-logo' />,
    },
    { title: "Địa chỉ rạp", dataIndex: "diaChi", key: "diaChi" },
    { title: "Trạng thái rạp", key: "operation", render: () => <p>Đang mở</p> },
  ];

  return (
    <div className='cinema-manage'>
      {isLoading && "Loading"}
      {!isLoading && (
        <>
          <h2 className='cinema-manage-heading'>Lịch chiếu phim</h2>
          <Table
            className='components-table-demo-nested'
            columns={columns}
            expandable={{ expandedRowRender }}
            dataSource={scheduleList}
          />
        </>
      )}
    </div>
  );
};

export default ScheduleFilm;
