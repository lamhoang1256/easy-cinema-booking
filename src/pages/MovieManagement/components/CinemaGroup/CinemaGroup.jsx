import { moviesApi } from "apis/moviesApi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Tag, Space } from "antd";

const CinemaGroup = () => {
  const { cinemaSystemId } = useParams();
  const cinemaSystemIdArray = cinemaSystemId?.split("-");
  const cinemaName = cinemaSystemIdArray.join("-");
  const cinemaSystemID = cinemaSystemIdArray.shift();

  const [isLoading, setIsLoading] = useState(true);
  const [cinemaGroup, setCinemaGroup] = useState();
  const [cinemaInfo, setCinemaInfo] = useState();
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
      key: "action",
      render: () => <button>Thêm lịch chiếu</button>,
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
        console.log(cinemaHasKey);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchCinemaGroup();
  }, []);

  return (
    <>
      {isLoading && "Loading"}
      {!isLoading && (
        <>
          <h2>{cinemaInfo.tenCumRap}</h2>
          <p>{cinemaInfo.diaChi}</p>
          <Table columns={columns} dataSource={cinemaGroup} />
        </>
      )}
    </>
  );
};
// getCinemaGroupApi
export default CinemaGroup;
