import React, { useEffect, useState } from "react";
import moment from "moment";
import { Controller } from "react-hook-form";
// components
import { Input } from "antd";
import { Switch } from "antd";
import { DatePicker } from "antd";
import InputText from "components/Input/InputText";
import { moviesApi } from "apis/moviesApi";
// validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaYupFilm } from "constants/schemaYupFilm";
// import "./editFilm.scss";
import MessageErrorValidation from "components/MessageErrorValidation/MessageErrorValidation";

const AddFilm = () => {
  // const { "5397" } = useParams();
  const { TextArea } = Input;

  const [movieThumbnail, setMovieThumbnail] = useState(null);
  const [movieThumbPreviewUrl, setMovieThumbPreviewUrl] = useState(null);
  const [movieOpenday, setMovieOpenday] = useState(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaYupFilm) });

  const onUploadThumbnail = (e) => {
    let file = e.target.files[0];
    setMovieThumbnail(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setMovieThumbPreviewUrl(() => reader.result);
    };
  };

  const onChangeDatePicker = (value) => {
    setMovieOpenday(moment(value).format("DD/MM/YYYY"));
  };

  const handleAddMovie = (data) => {
    const requestNewMovie = {
      tenPhim: data.movieName,
      moTa: data.movieDesc,
      trailer: data.movieUrlTrailer,
      maNhom: "GP00",
      ngayKhoiChieu: movieOpenday || moment(new Date()).format("DD/MM/YYYY"),
      sapChieu: data.comingSoonMovie,
      dangChieu: data.showingMovie,
      hot: data.hotMovie,
      danhGia: data.movieRating * 2,
      hinhAnh: movieThumbnail,
    };

    let formData = new FormData();
    for (var key in requestNewMovie) {
      if (key !== "hinhAnh") {
        formData.append(key, requestNewMovie[key]);
      } else {
        if (requestNewMovie.hinhAnh !== null) {
          formData.append("File", requestNewMovie.hinhAnh, requestNewMovie.hinhAnh?.name);
        }
      }
    }

    const addNewMovie = async (formData) => {
      try {
        const res = await moviesApi.addNewMovieApi(formData);
        console.log(res);
      } catch (error) {
        console.log(error);
        console.log(error?.response?.data?.content);
      }
    };

    addNewMovie(formData);
  };

  return (
    <>
      <div>
        <h2>Chỉnh sửa thông tin phim</h2>
        <form className='edit-film' onSubmit={handleSubmit(handleAddMovie)}>
          <AddFilmGroup label='Mã phim'>
            <p>123</p>
          </AddFilmGroup>

          <AddFilmGroup label='Ngày khởi chiếu'>
            <DatePicker
              defaultValue={moment(new Date(), "DD/MM/YYYY")}
              control={control}
              onChange={onChangeDatePicker}
              format='DD/MM/YYYY'
            />
          </AddFilmGroup>

          <AddFilmGroup label='Tên Phim'>
            <InputText
              defaultValue=''
              name='movieName'
              type='text'
              control={control}
              className='edit-film-input'
            />
            <MessageErrorValidation errorMessage={errors.movieName?.message} />
          </AddFilmGroup>

          <AddFilmGroup label='Đang chiếu'>
            <Controller
              control={control}
              name='showingMovie'
              defaultValue={false}
              render={({ field: { onChange } }) => <Switch onChange={onChange} />}
            />
          </AddFilmGroup>

          <AddFilmGroup label='Trailer'>
            <InputText
              defaultValue=''
              type='text'
              control={control}
              className='edit-film-input'
              name='movieUrlTrailer'
            />
            <MessageErrorValidation errorMessage={errors.movieUrlTrailer?.message} />
          </AddFilmGroup>

          <AddFilmGroup label='Sắp chiếu'>
            <Controller
              control={control}
              name='comingSoonMovie'
              defaultValue={false}
              render={({ field: { onChange } }) => <Switch onChange={onChange} />}
            />
          </AddFilmGroup>

          <AddFilmGroup label='Đánh giá'>
            <InputText
              defaultValue=''
              type='number'
              control={control}
              className='edit-film-input'
              name='movieRating'
              min={1}
              max={5}
            />
            <MessageErrorValidation errorMessage={errors.movieRating?.message} />
          </AddFilmGroup>

          <AddFilmGroup label='Đang hot'>
            <Controller
              control={control}
              name='hotMovie'
              defaultValue={false}
              render={({ field: { onChange } }) => <Switch onChange={onChange} />}
            />
          </AddFilmGroup>

          <AddFilmGroup label='Mô tả'>
            <Controller
              control={control}
              name='movieDesc'
              defaultValue=''
              render={({ field: { onChange } }) => (
                <TextArea width={300} rows={10} onChange={onChange} />
              )}
            />
            <MessageErrorValidation errorMessage={errors.movieDesc?.message} />
          </AddFilmGroup>

          <AddFilmGroup label='Thumbnail'>
            <input type='file' accept='image/*' onChange={onUploadThumbnail} />
            {movieThumbPreviewUrl ? (
              <img className='edit-film-thumbnail' src={movieThumbPreviewUrl} />
            ) : (
              <img
                className='edit-film-thumbnail'
                src='https://as1.ftcdn.net/v2/jpg/03/95/54/28/1000_F_395542843_yEu4THq7LoI4EWl19sm3A8ApbKSUxTVl.jpg'
              />
            )}
          </AddFilmGroup>

          <button className='btn btn--primary' type='submit'>
            Sửa
          </button>
        </form>
      </div>
    </>
  );
};

const AddFilmGroup = ({ label, children }) => (
  <div className='edit-film-group'>
    <span className='edit-film-label'>{label}: </span>
    {children}
  </div>
);

export default AddFilm;

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
