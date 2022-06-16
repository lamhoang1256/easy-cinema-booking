import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import Swal from "sweetalert2";
import { moviesApi } from "apis/moviesApi";
import { createKeyForObj } from "utilities/createKeyForObject";
import { formatLocaleDateString } from "utilities/formatDate";
import axios from "axios";

const MovieManagement = () => {
  const [movieList, setMovieList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovieList = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("https://roxy-cinema-api.herokuapp.com/api/movies/all");
      const movieListHasKey = createKeyForObj(data.data.movies);
      setMovieList(movieListHasKey);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieList();
  }, []);
  // const fetchMovieList = async () => {
  //   setIsLoading(true);
  //   try {
  //     const { data } = await moviesApi.getMovieListApi("00");
  //     const movieListHasKey = createKeyForObj(data.content);
  //     setMovieList(movieListHasKey);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchMovieList();
  // }, []);

  const handleDeleteMovie = (idMovie) => {
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
            const response = await moviesApi.deleteMovieApi(idMovie);
            if (response) {
              Swal.fire("Xóa thành công!", "Phim bạn chọn đã được xóa.", "success");
              fetchMovieList();
            }
          } catch (error) {
            Swal.fire("Xóa thất bại!", error?.response?.data?.content, "error");
          }
        };
        deleteMovie(idMovie);
      }
    });
  };

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: 100,
    },
    {
      title: "Tên phim",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 130,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 340,
      render: (desc) => <p className="movie-manage-desc">{desc}</p>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "poster",
      key: "img",
      width: 140,
      render: (img) => <img className="movie-manage-thumb" src={img} alt="poster" />,
    },
    {
      title: "Trailer",
      dataIndex: "trailer",
      key: "trailer",
      width: 150,
      render: (urlTrailer) => (
        <a className="text-center" href={urlTrailer}>
          {urlTrailer}
        </a>
      ),
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "releaseDate",
      key: "releaseDate",
      width: 160,
      render: (releaseDate) => <p className="text-center">{formatLocaleDateString(releaseDate)}</p>,
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      width: 100,
      render: (rating) => <p className="text-center">{rating}</p>,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "operation",
      fixed: "right",
      render: (id) => (
        <div className="movie-manage-action">
          <Link to={`/admin/movie-manage/edit-film/${id}`}>
            <button className="btn btn--warning">Sửa</button>
          </Link>
          <button className="btn btn--primary" onClick={() => handleDeleteMovie(id)}>
            Xóa
          </button>
          <Link to={`/admin/movie-manage/schedule/${id}`}>
            <button className="btn btn--success">Lịch chiếu</button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="movie-manage">
      {isLoading && "Loading"}
      {!isLoading && (
        <>
          <div className="movie-manage-top">
            <h2>Quản lí phim</h2>
            <Link to="/admin/movie-manage/add-film">
              <button className="btn btn--info btn-add-film">
                <ion-icon name="add-outline"></ion-icon> Thêm phim mới
              </button>
            </Link>
          </div>
          <Table columns={columns} dataSource={movieList} scroll={{ x: 1300 }} sticky />
        </>
      )}
    </div>
  );
};

export default MovieManagement;
