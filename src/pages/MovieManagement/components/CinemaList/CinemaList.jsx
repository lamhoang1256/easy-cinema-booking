import { Table, Badge, Menu, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { moviesApi } from "apis/moviesApi";
import "./cinemaList.scss";
import { Link } from "react-router-dom";

const menu = <Menu items={[{ label: "Action 1" }, { label: "Action 2" }]} />;
// logo: "https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png"
// lstCumRap: (5) [{…}, {…}, {…}, {…}, {…}]
// maHeThongRap: "BHDStar"
// mahom: "GP00"
// tenHeThongRap: "BHD Star Cineplex"
const CinemaList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cinemaList, setCinemaList] = useState();
  useEffect(() => {
    const fetchCinemaList = async () => {
      setIsLoading(true);
      try {
        const { data } = await moviesApi.getCinemaApi("00");
        const dataHasKey = data.content.map((cinema, index) => {
          return { ...cinema, key: index };
        });
        setCinemaList(dataHasKey);
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
    console.log(row.lstCumRap);
    const cinemaHasKey = row.lstCumRap.map((cinema, index) => {
      return { ...cinema, key: index };
    });

    // danhSachPhim: (11) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    // diaChi: "L5-Vincom 3/2, 3C Đường 3/2, Q.10"
    // hinhAnh: "https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png"
    // maCumRap: "bhd-star-cineplex-3-2"
    // tenCumRap: "BHD Star Cineplex - 3/2"
    const columns = [
      { title: "Mã rạp ", dataIndex: "maCumRap", key: "maCumRap" },
      { title: "Tên rạp", dataIndex: "tenCumRap", key: "tenCumRap" },
      { title: "Địa chỉ rạp", dataIndex: "diaChi", key: "diaChi" },
      {
        title: "Action",
        dataIndex: "maCumRap",
        key: "maCumRap",
        render: (maCumRap) => (
          <Link to={`/admin/cinema-group/${maCumRap}`}>
            <button>Thêm lịch chiếu</button> ,
          </Link>
        ),
      },
    ];

    // console.log(cinemaList.lstCumRap);
    return <Table columns={columns} dataSource={cinemaHasKey} pagination={false} />;
  };
  // logo: "https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png"
  // lstCumRap: (5) [{…}, {…}, {…}, {…}, {…}]
  // maHeThongRap: "BHDStar"
  // mahom: "GP00"
  // tenHeThongRap: "BHD Star Cineplex"
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

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: "Screem",
      platform: "iOS",
      version: "10.3.4.5654",
      upgradeNum: 500,
      creator: "Jack",
      createdAt: "2014-12-24 23:12:00",
    });
  }

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
