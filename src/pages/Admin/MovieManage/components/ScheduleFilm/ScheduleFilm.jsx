import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { moviesApi } from "apis/moviesApi";
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
        const { data } = await moviesApi.getCalendarShowApi("1295");
        const { heThongRapChieu, ...movie } = data.content;
        const scheduleListHasKey = createKeyForObj(heThongRapChieu);
        setScheduleList(scheduleListHasKey);
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
    const cinemaHasKey = createKeyForObj(row.cumRapChieu);
    const columnsCinema = [
      { title: "Tên rạp", dataIndex: "tenCumRap", key: "tenCumRap" },
      {
        title: "Địa chỉ rạp",
        dataIndex: "diaChi",
        key: "diaChi",
        render: (diaChi) => <p className='cinema-manage-address'>{diaChi}</p>,
      },
    ];

    console.log(cinemaHasKey);
    const expandedRowRender1 = (row) => {
      const columnsTheater = [
        { title: "Mã rạp", dataIndex: "maRap", key: "maRap" },
        { title: "Tên rạp", dataIndex: "tenRap", key: "tenRap" },
        { title: "Mã lịch chiếu", dataIndex: "maLichChieu", key: "maLichChieu" },
        { title: "Ngày chiếu", dataIndex: "ngayChieuGioChieu", key: "ngayChieuGioChieu" },
        { title: "Giá vé", dataIndex: "giaVe", key: "giaVe" },
      ];
      //       giaVe: 75000
      // maLichChieu: "29755"
      // maRap: "720"
      // ngayChieuGioChieu: "2019-01-01T10:10:00"
      // tenRap: "Rạp 10"
      // thoiLuong: 120
      return (
        <Table
          // rowKey={2}
          columns={columnsTheater}
          dataSource={row.lichChieuPhim}
          pagination={false}
          expandable={expandedRowRender1}
        />
      );
    };

    return (
      <Table
        key={2}
        rowKey={(row) => row.id}
        columns={columnsCinema}
        dataSource={cinemaHasKey}
        pagination={false}
        expandable={expandedRowRender1}
      />
    );
  };

  const columns = [
    {
      title: "Mã hệ thống rạp",
      dataIndex: "maHeThongRap",
      key: "codeCinema",
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (logo) => <img src={logo} alt='logo' className='cinema-list-logo' />,
    },
    { title: "Tên hệ thống rạp", dataIndex: "tenHeThongRap", key: "nameCinema" },
    { title: "Trạng thái rạp", key: "operation", render: () => <p>Đang mở</p> },
  ]; // cumRapChieu: [{…}]
  // key: 0
  // logo: "https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png"
  // maHeThongRap: "BHDStar"
  // tenHeThongRap: "BHD Star Cineplex"
  // Mã hệ thống rạp	Logo	Tên hệ thống rạp	Mã nhóm	Trạng thái rạp

  return (
    <div className='cinema-manage'>
      {isLoading && "Loading"}
      {!isLoading && (
        <>
          <h2 className='cinema-manage-heading'>Lịch chiếu phim</h2>
          <Table
            key={1}
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
