import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { moviesApi } from "apis/moviesApi";
import { createKeyForObj } from "utilities/createKeyForObject";

const CinemaManage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cinemaList, setCinemaList] = useState();

  useEffect(() => {
    const fetchCinemaManage = async () => {
      setIsLoading(true);
      try {
        const { data } = await moviesApi.getCinemaApi("00");
        const cinemaListHasKey = createKeyForObj(data.content);
        setCinemaList(cinemaListHasKey);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchCinemaManage();
  }, []);

  const expandedRowRender = (row) => {
    const cinemaHasKey = row.lstCumRap.map((cinema, index) => {
      return { ...cinema, key: index, maHeThongRap: row.maHeThongRap };
    });

    const columns = [
      { title: "Mã rạp ", dataIndex: "maCumRap", key: "maCumRap" },
      { title: "Tên rạp", dataIndex: "tenCumRap", key: "tenCumRap" },
      {
        title: "Địa chỉ rạp",
        dataIndex: "diaChi",
        key: "diaChi",
        render: (diaChi) => <p className='cinema-manage-address'>{diaChi}</p>,
      },
      {
        title: "Action",
        dataIndex: "maCumRap",
        key: "maCumRap",
        render: (maCumRap, getRow) => {
          const url = `/admin/cinema-manage/${getRow.maHeThongRap.toLowerCase()}/${maCumRap}`;
          return (
            <Link to={url}>
              <button className='btn btn--info'>Thêm lịch chiếu</button>
            </Link>
          );
        },
      },
    ];
    return <Table columns={columns} dataSource={cinemaHasKey} pagination={false} />;
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
    { title: "Mã nhóm", dataIndex: "mahom", key: "codeGroup" },
    { title: "Trạng thái rạp", key: "operation", render: () => <p>Đang mở</p> },
  ];

  return (
    <div className='cinema-manage'>
      {isLoading && "Loading"}
      {!isLoading && (
        <>
          <h2 className='cinema-manage-heading'>Quản lí người dùng</h2>
          <Table
            className='components-table-demo-nested'
            columns={columns}
            expandable={{ expandedRowRender }}
            dataSource={cinemaList}
          />
        </>
      )}
    </div>
  );
};

export default CinemaManage;