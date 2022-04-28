import { useEffect, useState } from "react";
import { Table } from "antd";
import "./movieManagement.scss";
import { moviesApi } from "apis/moviesApi";
import { formatLocaleDateString } from "utilities/formatDate";
import { Link } from "react-router-dom";
import { sweetAlert } from "utilities/sweetAlert";
import Swal from "sweetalert2";

const MovieManagement = () => {
  const [movieList, setMovieList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovieList = async () => {
    setIsLoading(true);
    try {
      const { data } = await moviesApi.getMovieListApi("00");
      const dataHasKey = data.content.map((item, index) => {
        return { ...item, key: index };
      });
      setMovieList(dataHasKey);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovieList();
  }, []);

  const handleDeleteMovie = (idMovie) => {
    console.log(idMovie);
    Swal.fire({
      title: "Xóa phim?",
      text: "Bạn có chắc chắc muốn xóa phim này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteMovie = async (idMovie) => {
          try {
            // const { data } = await moviesApi.deleteMovieApi(idMovie);
            const { data } = await moviesApi.deleteMovieApi(idMovie);
            console.log(data);
            Swal.fire("Xóa thành công!", "Phim bạn chọn đã được xóa.", "success");
            fetchMovieList();
          } catch (error) {
            Swal.fire("Xóa thất bại!", error?.response?.data?.content, "error");
            console.log(error?.response?.data?.content);
          }
        };
        deleteMovie(idMovie);
      }
    });
  };

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
          <button onClick={() => handleDeleteMovie(id)}>Xóa</button>
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
