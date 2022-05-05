import React, { useState } from "react";
import moment from "moment";
import { Controller } from "react-hook-form";
// components
import { Input } from "antd";
import { Switch } from "antd";
import { DatePicker } from "antd";
import InputText from "components/InputText/InputText";
import ErrorValidation from "components/Message/ErrorValidation";
// validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaYupFilm } from "constants/schemaYupFilm";
import { moviesApi } from "apis/moviesApi";
import { sweetAlert } from "utilities/sweetAlert";

const AddFilm = () => {
  const { TextArea } = Input;
  const [movieThumbnail, setMovieThumbnail] = useState("");
  const [movieThumbPreviewUrl, setMovieThumbPreviewUrl] = useState("");
  const [movieOpenday, setMovieOpenday] = useState("");
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

    (async () => {
      try {
        const res = await moviesApi.addNewMovieApi(formData);
        if (res.status === 200) {
          sweetAlert("success", "Thêm mới phim thành công!", "Bạn đã thêm mới phim thành công!");
        }
        console.log(res);
      } catch (error) {
        sweetAlert("error", "Thêm mới phim thất bại!", error?.response?.data?.content);
      }
    })();
  };

  return (
    <div>
      <h2>Thêm phim mới</h2>
      <form className='form-film' onSubmit={handleSubmit(handleAddMovie)}>
        <AddFilmGroup label='Mã phim'>
          <p>Tự động thêm mới</p>
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
            className='form-film-input'
          />
          <ErrorValidation errorMessage={errors.movieName?.message} />
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
            className='form-film-input'
            name='movieUrlTrailer'
          />
          <ErrorValidation errorMessage={errors.movieUrlTrailer?.message} />
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
            className='form-film-input'
            name='movieRating'
            min={1}
            max={5}
          />
          <ErrorValidation errorMessage={errors.movieRating?.message} />
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
          <ErrorValidation errorMessage={errors.movieDesc?.message} />
        </AddFilmGroup>

        <AddFilmGroup label='Thumbnail'>
          <input type='file' accept='image/*' onChange={onUploadThumbnail} />
          {movieThumbPreviewUrl ? (
            <img className='form-film-thumbnail' src={movieThumbPreviewUrl} />
          ) : (
            <img
              className='form-film-thumbnail'
              src='https://as1.ftcdn.net/v2/jpg/03/95/54/28/1000_F_395542843_yEu4THq7LoI4EWl19sm3A8ApbKSUxTVl.jpg'
            />
          )}
        </AddFilmGroup>

        <button className='btn btn--primary' type='submit'>
          Sửa
        </button>
      </form>
    </div>
  );
};

const AddFilmGroup = ({ label, children }) => (
  <div className='form-film-group'>
    <span className='form-film-label'>{label}: </span>
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
