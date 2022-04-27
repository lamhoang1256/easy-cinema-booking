import { useEffect, useState } from "react";
import { Table } from "antd";
import "./movieManagement.scss";
import { moviesApi } from "apis/moviesApi";
import { formatLocaleDateString } from "utilities/formatDate";
import { Link } from "react-router-dom";

// biDanh: "the-walking-dead-1"
// dangChieu: true
// danhGia: 5
// hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/the-walking-dead-1_gp00.jpg"
// hot: false
// maNhom: "GP00"
// maPhim: 1293
// moTa: "Sheriff's Deputy Rick Grimes leads a group of survivors in a world overrun by zombies."
// ngayKhoiChieu: "2021-09-06T00:00:00"
// sapChieu: false
// tenPhim: "The Walking Dead 1"
// trailer: "https://www.youtube.com/embed/R1v0uFms68U"

const MovieManagement = () => {
  const [movieList, setMovieList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovieList = async () => {
    setIsLoading(true);
    try {
      const { data } = await moviesApi.getMovieListApi("00");
      setMovieList(data.content);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovieList();
  }, []);

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "id",
      fixed: "left",
      width: 100,
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "name",
      fixed: "left",
      width: 130,
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "desc",
      width: 300,
      render: (desc) => <p className='movie-management-desc'>{desc}</p>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "img",
      width: 140,
      render: (img) => <img className='movie-management-thumb' src={img} />,
    },
    {
      title: "Trailer",
      dataIndex: "trailer",
      key: "trailer",
      width: 130,
      render: (urlTrailer) => (
        <a className='text-center' href={urlTrailer}>
          {urlTrailer}
        </a>
      ),
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "ngayKhoiChieu",
      key: "openday",
      width: 160,
      render: (openday) => <p className='text-center'>{formatLocaleDateString(openday)}</p>,
    },
    {
      title: "Đánh giá",
      dataIndex: "danhGia",
      key: "rating",
      width: 100,
      render: (rating) => <p className='text-center'>{rating / 2}/5</p>,
    },
    {
      title: "Action",
      dataIndex: "maPhim",
      key: "operation",
      fixed: "right",
      render: (id) => (
        <>
          <Link to={`/admin/edit-film/${id}`}>
            <button>Sửa</button>
          </Link>
          <button>Xóa</button>
          <button>Lịch chiếu</button>
        </>
      ),
    },
  ];

  return (
    <div className='movie-management'>
      {isLoading && "Loading"}
      {!isLoading && (
        <>
          <Table columns={columns} dataSource={movieList} scroll={{ x: 1300 }} sticky />
        </>
      )}
    </div>
  );
};

export default MovieManagement;
