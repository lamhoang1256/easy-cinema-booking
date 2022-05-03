import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Table } from "antd";
import { moviesApi } from "apis/moviesApi";
import moment from "moment";
import { createKeyForObj } from "utilities/createKeyForObject";

const ScheduleFilm = () => {
  const { idSchedule } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    const fetchCinemaManage = async () => {
      setIsLoading(true);
      try {
        const { data } = await moviesApi.getCalendarShowApi(idSchedule);
        const { heThongRapChieu } = data.content;
        const systemCinemaList = createKeyForObj(heThongRapChieu);
        let cinemaList = [];
        systemCinemaList.forEach((cinemaGroup) => {
          cinemaGroup.cumRapChieu.forEach((cinema) => cinemaList.push(cinema));
        });
        cinemaList = createKeyForObj(cinemaList);
        setScheduleList(cinemaList);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchCinemaManage();
  }, []);

  const expandedRowRender = (row) => {
    const scheduleFilms = createKeyForObj(row.lichChieuPhim);
    const columSchedule = [
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
          columns={columSchedule}
          dataSource={scheduleFilms}
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
