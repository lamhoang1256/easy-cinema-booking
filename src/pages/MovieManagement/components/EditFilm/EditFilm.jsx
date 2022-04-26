import React, { useEffect, useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
// components
import { Input } from "antd";
import { Switch } from "antd";
import { DatePicker } from "antd";
import InputText from "components/Input/InputText";
import { moviesApi } from "apis/moviesApi";
import "./editFilm.scss";

const EditFilm = () => {
  const { TextArea } = Input;

  const [movieEdit, setMovieEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [movieThumbnail, setMovieThumbnail] = useState(null);
  const [movieOpenday, setMovieOpenday] = useState(null);

  const {
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  const fetchMovieEdit = async () => {
    setIsLoading(true);
    try {
      const { data } = await moviesApi.getMovieDetailApi("5397");
      setMovieEdit(data.content);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const onUploadThumbnail = (e) => {
    setMovieThumbnail(e.target.files[0]);
  };

  const onChangeDatePicker = (value) => {
    setMovieOpenday(moment(value).format("DD/MM/YYYY"));
  };

  const handleEditMovie = (data) => {
    console.log(movieOpenday);
    const requestEditMovie = {
      maPhim: "5397",
      tenPhim: data.movieName,
      trailer: data.movieUrlTrailer,
      moTa: data.movieDesc,
      maNhom: "GP00",
      ngayKhoiChieu: movieOpenday || movieEdit.ngayKhoiChieu,
      sapChieu: data.comingSoonMovie,
      dangChieu: data.showingMovie,
      hot: data.hotMovie,
      danhGia: 10,
      hinhAnh: movieThumbnail,
    };

    let formData = new FormData();
    for (var key in requestEditMovie) {
      if (key !== "hinhAnh") {
        formData.append(key, requestEditMovie[key]);
      } else {
        if (requestEditMovie.hinhAnh !== null) {
          formData.append("File", requestEditMovie.hinhAnh, requestEditMovie.hinhAnh.name);
        }
      }
    }

    const editMovie = async (formData) => {
      try {
        const res = await moviesApi.editMovieApi(formData);
        console.log(res);
      } catch (error) {
        console.log(error);
        console.log(error?.response?.data?.content);
      }
    };

    editMovie(formData);
  };

  useEffect(() => {
    fetchMovieEdit();
  }, []);

  return (
    <>
      {isLoading && "Loading"}
      {!isLoading && (
        <div>
          <form className='edit-film' onSubmit={handleSubmit(handleEditMovie)}>
            <EditFilmGroup label='Tên Phim'>
              <InputText
                name='movieName'
                type='text'
                control={control}
                className='edit-film-input'
                defaultValue={movieEdit.tenPhim}
              />
            </EditFilmGroup>

            <EditFilmGroup label='Đang chiếu'>
              <Controller
                control={control}
                name='showingMovie'
                defaultValue={movieEdit.dangChieu}
                render={({ field: { onChange, value } }) => (
                  <Switch defaultChecked={movieEdit.dangChieu} onChange={onChange} />
                )}
              />
            </EditFilmGroup>

            <EditFilmGroup label='Trailer'>
              <InputText
                type='text'
                control={control}
                className='edit-film-input'
                defaultValue={movieEdit.trailer}
                name='movieUrlTrailer'
              />
            </EditFilmGroup>

            <EditFilmGroup label='Sắp chiếu'>
              <Controller
                control={control}
                name='comingSoonMovie'
                defaultValue={movieEdit.sapChieu}
                render={({ field: { onChange, value } }) => (
                  <Switch defaultChecked={movieEdit.sapChieu} onChange={onChange} />
                )}
              />
            </EditFilmGroup>

            <EditFilmGroup label='Đánh giá'>
              <InputText
                type='text'
                control={control}
                className='edit-film-input'
                defaultValue={movieEdit.danhGia / 2}
                name='movieRating'
              />
            </EditFilmGroup>

            <EditFilmGroup label='Đang hot'>
              <Controller
                control={control}
                name='hotMovie'
                defaultValue={movieEdit.hot}
                render={({ field: { onChange, value } }) => (
                  <Switch defaultChecked={movieEdit.hot} onChange={onChange} />
                )}
              />
            </EditFilmGroup>

            <EditFilmGroup label='Mô tả'>
              <Controller
                control={control}
                name='movieDesc'
                defaultValue={movieEdit.moTa}
                render={({ field: { onChange, value } }) => (
                  <TextArea
                    width={300}
                    rows={7}
                    defaultValue={movieEdit.moTa}
                    onChange={onChange}
                  />
                )}
              />
            </EditFilmGroup>

            <EditFilmGroup label='Thumbnail'>
              <input type='file' onChange={onUploadThumbnail} />
            </EditFilmGroup>

            <EditFilmGroup label='Ngày khởi chiếu'>
              <DatePicker
                defaultValue={moment(
                  new Date(movieEdit.ngayKhoiChieu).toLocaleDateString("vi-VI"),
                  "DD/MM/YYYY"
                )}
                control={control}
                name='movieOpenday'
                onChange={onChangeDatePicker}
                format='DD/MM/YYYY'
              />
            </EditFilmGroup>

            <button className='btn btn--primary' type='submit'>
              Sửa
            </button>
          </form>
        </div>
      )}
    </>
  );
};

const EditFilmGroup = ({ label, children }) => (
  <div className='edit-film-group'>
    <span className='edit-film-label'>{label}: </span>
    {children}
  </div>
);

export default EditFilm;

// biDanh: "wanted-2"
// dangChieu: true
// danhGia: 10
// hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/wanted2_gp13.jpg"
// hot: false
// maNhom: "GP13"
// maPhim: 8188
// moTa: "Wanted is a 2008 American action thriller film directed by Timur Bekmambetov and written by Michael Brandt, Derek Haas, and Chris Morgan, loosely based on the comic book miniseries by Mark Millar and J. G. Jones. The film stars James McAvoy, Morgan Freeman, Terence Stamp, Thomas Kretschmann, Common, and Angelina Jolie.nn"
// ngayKhoiChieu: "2021-11-09T01:46:29.307"
// sapChieu: false
// tenPhim: "Wanted 2"
// trailer: "https://www.youtube.com/embed/-TJ0o4oB0gc"
