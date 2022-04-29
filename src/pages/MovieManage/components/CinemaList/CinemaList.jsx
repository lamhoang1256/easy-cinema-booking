import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { moviesApi } from "apis/moviesApi";
import { createKeyForObj } from "utilities/createKeyForObject";
import "./cinemaList.scss";

const CinemaList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cinemaList, setCinemaList] = useState();

  useEffect(() => {
    const fetchCinemaList = async () => {
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
    console.log(cinemaList);
    fetchCinemaList();
  }, []);

  const expandedRowRender = (row) => {
    const cinemaHasKey = row.lstCumRap.map((cinema, index) => {
      return { ...cinema, key: index, maHeThongRap: row.maHeThongRap };
    });

    const columns = [
      { title: "Mã rạp ", dataIndex: "maCumRap", key: "maCumRap" },
      { title: "Tên rạp", dataIndex: "tenCumRap", key: "tenCumRap" },
      { title: "Địa chỉ rạp", dataIndex: "diaChi", key: "diaChi" },
      {
        title: "Action",
        dataIndex: "maCumRap",
        key: "maCumRap",
        render: (maCumRap, getRow) => {
          return (
            <Link to={`/admin/cinema-manage/${getRow.maHeThongRap.toLowerCase()}/${maCumRap}`}>
              <button>Thêm lịch chiếu</button> ,
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
    <>
      {isLoading && "Loading"}
      {!isLoading && (
        <Table
          className='components-table-demo-nested'
          columns={columns}
          expandable={{ expandedRowRender }}
          dataSource={cinemaList}
        />
      )}
    </>
  );
};

export default CinemaList;
