import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Controller } from "react-hook-form";
// components
import { Input } from "antd";
import { Switch } from "antd";
import { DatePicker } from "antd";
import InputText from "components/InputText/InputText";
import { moviesApi } from "apis/moviesApi";
import ErrorValidation from "components/Message/ErrorValidation";
// validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaYupFilm } from "constants/schemaYupFilm";
import { sweetAlert } from "utilities/sweetAlert";

const EditFilm = () => {
  const { idMovieEdit } = useParams();
  const { TextArea } = Input;
  const [movieEdit, setMovieEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [movieThumbnail, setMovieThumbnail] = useState(null);
  const [movieThumbPreviewUrl, setMovieThumbPreviewUrl] = useState(null);
  const [movieOpenday, setMovieOpenday] = useState(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaYupFilm) });

  const fetchMovieEdit = async () => {
    setIsLoading(true);
    try {
      const { data } = await moviesApi.getMovieDetailApi(idMovieEdit);
      setMovieEdit(data.content);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

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

  const handleEditMovie = (data) => {
    const requestEditMovie = {
      maPhim: idMovieEdit,
      tenPhim: data.movieName,
      trailer: data.movieUrlTrailer,
      moTa: data.movieDesc,
      maNhom: "GP00",
      ngayKhoiChieu: movieOpenday || moment(movieEdit.ngayKhoiChieu).format("DD/MM/YYYY"),
      sapChieu: data.comingSoonMovie,
      dangChieu: data.showingMovie,
      hot: data.hotMovie,
      danhGia: data.movieRating * 2,
      hinhAnh: movieThumbnail,
    };
    let formData = new FormData();
    for (var key in requestEditMovie) {
      if (key !== "hinhAnh") {
        formData.append(key, requestEditMovie[key]);
      } else {
        if (requestEditMovie.hinhAnh !== null) {
          formData.append("File", requestEditMovie.hinhAnh, requestEditMovie.hinhAnh?.name);
        }
      }
    }
    (async () => {
      try {
        const response = await moviesApi.editMovieApi(formData);
        if (response) {
          sweetAlert(
            "success",
            "Cập nhật phim thành công!",
            "Bạn đã sửa thành công thông tin phim!"
          );
        }
      } catch (error) {
        sweetAlert("error", "Cập nhật phim thất bại!", error?.response?.data?.content);
      }
    })();
  };

  useEffect(() => {
    fetchMovieEdit();
  }, []);

  return (
    <>
      {isLoading && "Loading"}
      {!isLoading && (
        <div>
          <h2>Chỉnh sửa thông tin phim</h2>
          <form className='form-film' onSubmit={handleSubmit(handleEditMovie)}>
            <EditFilmGroup label='Mã phim'>
              <p>{movieEdit.maPhim}</p>
            </EditFilmGroup>

            <EditFilmGroup label='Ngày khởi chiếu'>
              <DatePicker
                defaultValue={moment(
                  new Date(movieEdit.ngayKhoiChieu).toLocaleDateString("vi-VI"),
                  "DD/MM/YYYY"
                )}
                control={control}
                onChange={onChangeDatePicker}
                format='DD/MM/YYYY'
              />
            </EditFilmGroup>

            <EditFilmGroup label='Tên Phim'>
              <InputText
                name='movieName'
                type='text'
                control={control}
                className='form-film-input'
                defaultValue={movieEdit.tenPhim}
              />
              <ErrorValidation errorMessage={errors.movieName?.message} />
            </EditFilmGroup>

            <EditFilmGroup label='Đang chiếu'>
              <Controller
                control={control}
                name='showingMovie'
                defaultValue={movieEdit.dangChieu}
                render={({ field: { onChange } }) => (
                  <Switch defaultChecked={movieEdit.dangChieu} onChange={onChange} />
                )}
              />
            </EditFilmGroup>

            <EditFilmGroup label='Trailer'>
              <InputText
                type='text'
                control={control}
                className='form-film-input'
                defaultValue={movieEdit.trailer}
                name='movieUrlTrailer'
              />
              <ErrorValidation errorMessage={errors.movieUrlTrailer?.message} />
            </EditFilmGroup>

            <EditFilmGroup label='Sắp chiếu'>
              <Controller
                control={control}
                name='comingSoonMovie'
                defaultValue={movieEdit.sapChieu}
                render={({ field: { onChange } }) => (
                  <Switch defaultChecked={movieEdit.sapChieu} onChange={onChange} />
                )}
              />
            </EditFilmGroup>

            <EditFilmGroup label='Đánh giá'>
              <InputText
                type='number'
                control={control}
                className='form-film-input'
                defaultValue={movieEdit.danhGia / 2}
                name='movieRating'
                min={1}
                max={5}
              />
              <ErrorValidation errorMessage={errors.movieRating?.message} />
            </EditFilmGroup>

            <EditFilmGroup label='Đang hot'>
              <Controller
                control={control}
                name='hotMovie'
                defaultValue={movieEdit.hot}
                render={({ field: { onChange } }) => (
                  <Switch defaultChecked={movieEdit.hot} onChange={onChange} />
                )}
              />
            </EditFilmGroup>

            <EditFilmGroup label='Mô tả'>
              <Controller
                control={control}
                name='movieDesc'
                defaultValue={movieEdit.moTa}
                render={({ field: { onChange } }) => (
                  <TextArea
                    width={300}
                    rows={10}
                    defaultValue={movieEdit.moTa}
                    onChange={onChange}
                  />
                )}
              />
              <ErrorValidation errorMessage={errors.movieDesc?.message} />
            </EditFilmGroup>

            <EditFilmGroup label='Thumbnail'>
              <input type='file' accept='image/*' onChange={onUploadThumbnail} />
              {movieThumbPreviewUrl ? (
                <img className='form-film-thumbnail' src={movieThumbPreviewUrl} />
              ) : (
                <img className='form-film-thumbnail' src={movieEdit?.hinhAnh} />
              )}
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
  <div className='form-film-group'>
    <span className='form-film-label'>{label}: </span>
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
