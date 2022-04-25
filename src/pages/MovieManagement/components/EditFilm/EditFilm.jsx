import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import InputText from "components/Input/InputText";
import { Input } from "antd";
import { Switch } from "antd";
import { moviesApi } from "apis/moviesApi";
import ImageUpload from "components/ImageUpload/ImageUpload";
import "./editFilm.scss";
// validation
import { useForm } from "react-hook-form";

const EditFilm = () => {
  const { TextArea } = Input;

  const [movieEdit, setMovieEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  const fetchMovieEdit = async () => {
    setIsLoading(true);
    try {
      const { data } = await moviesApi.getMovieDetailApi("8188");
      setMovieEdit(data.content);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleEditMovie = (data) => {
    const requestEditMovie = {
      maPhim: "8188",
      tenPhim: data.movieName,
      trailer: data.movieUrlTrailer,
      moTa: data.movieDesc,
      maNhom: "GP00",
      ngayKhoiChieu: "10/10/2020",
      SapChieu: data.comingSoonMovie,
      DangChieu: data.showingMovie,
      Hot: data.hotMovie,
      danhGia: data.movieRating,
      hinhAnh: null,
    };
    console.log(data);
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
                name='descMovie'
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
              <ImageUpload {...register("movieThumbnail")} />
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
