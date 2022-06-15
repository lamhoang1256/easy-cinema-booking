import moment from "moment";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { DatePicker, Input as InputAntd, Switch } from "antd";
import { moviesApi } from "apis/moviesApi";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/button/Button";
import Field from "components/field/Field";
import ImageUpload from "components/image/ImageUpload";
import Label from "components/label/Label";
import LabelError from "components/label/LabelError";
import { schemaYupFilm } from "constants/movie.schema";
import { useForm } from "react-hook-form";
import { sweetAlert } from "utilities/sweetAlert";
import styled from "styled-components";
import Input from "components/input/Input";

const StyledMovieUpdate = styled.div`
  .form-layout {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    button {
      width: max-content;
    }
  }
  .date {
    height: 53px;
  }
  .editor p {
    line-height: 2;
    font-size: 1.8rem;
  }
  .submit {
    width: 100%;
  }
`;

const EditFilm = () => {
  const { idMovieEdit } = useParams();
  const { TextArea } = InputAntd;
  const [movieEdit, setMovieEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [poster, setPoster] = useState(null);
  const [releasedOn, setReleasedOn] = useState(null);
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

  const onChangeDatePicker = (value) => {
    setReleasedOn(moment(value).format("DD/MM/YYYY"));
  };

  const handleEditMovie = (data) => {
    const requestEditMovie = {
      maPhim: idMovieEdit,
      tenPhim: data.title,
      moTa: data.description,
      trailer: data.trailer,
      maNhom: "GP00",
      ngayKhoiChieu: releasedOn || moment(new Date()).format("DD/MM/YYYY"),
      sapChieu: data.isComming,
      dangChieu: data.isShowing,
      hot: data.isHot,
      danhGia: data.rating,
      hinhAnh: poster,
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

  if (isLoading) return "Loading";
  console.log(movieEdit);
  return (
    <StyledMovieUpdate>
      <h2>Thêm phim mới</h2>
      <form className="movie" onSubmit={handleSubmit(handleEditMovie)}>
        <div className="form-layout">
          <Field>
            <Label>Ngày khởi chiếu</Label>
            <DatePicker
              className="date"
              defaultValue={moment(new Date(), "DD/MM/YYYY")}
              control={control}
              onChange={onChangeDatePicker}
              format="DD/MM/YYYY"
            />
          </Field>
          <Field>
            <Label htmlFor="title">Tên phim</Label>
            <Input
              placeholder="Tên phim"
              name="title"
              type="text"
              defaultValue={movieEdit?.tenPhim}
              control={control}
            />
            <LabelError>{errors.title?.message} </LabelError>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="rating">Đánh giá</Label>
            <Input
              type="number"
              defaultValue={movieEdit?.danhGia}
              control={control}
              name="rating"
            />
            <LabelError>{errors.rating?.message}</LabelError>
          </Field>
          <Field>
            <Label htmlFor={"trailer"}>Trailer</Label>
            <Input type="text" defaultValue={movieEdit?.trailer} control={control} name="trailer" />
            <LabelError>{errors.trailer?.message}</LabelError>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Poster</Label>
            <ImageUpload setImage={setPoster}></ImageUpload>
          </Field>
          <Field>
            <Label>Status</Label>
            <Field>
              <Label htmlFor="isShowing">Đang chiếu</Label>
              <Controller
                control={control}
                name="isShowing"
                render={({ field: { onChange } }) => (
                  <Switch onChange={onChange} defaultChecked={movieEdit?.dangChieu} />
                )}
              />
            </Field>
            <Field>
              <Label htmlFor="isComming">Sắp chiếu</Label>
              <Controller
                control={control}
                name="isComming"
                render={({ field: { onChange } }) => (
                  <Switch onChange={onChange} defaultChecked={movieEdit?.sapChieu} />
                )}
              />
            </Field>
            <Field>
              <Label htmlFor="isHot">Đang hot</Label>
              <Controller
                control={control}
                name="isHot"
                render={({ field: { onChange } }) => (
                  <Switch onChange={onChange} defaultChecked={movieEdit?.hot} />
                )}
              />
            </Field>
          </Field>
        </div>
        <Field>
          <Label htmlFor="description">Description</Label>
          <div className="description">
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange } }) => (
                <TextArea onChange={onChange} defaultValue={movieEdit?.moTa} />
              )}
            />
          </div>
          <LabelError>{errors.description?.message} </LabelError>
        </Field>
        <Button kind="purple" type="submit" className="submit">
          Sửa
        </Button>
      </form>
    </StyledMovieUpdate>
  );

  // return (
  //   <>
  //     {isLoading && "Loading"}
  //     {!isLoading && (
  //       <div>
  //         <h2>Chỉnh sửa thông tin phim</h2>
  //         <form className="form-film" onSubmit={handleSubmit(handleEditMovie)}>
  //           <EditFilmGroup label="Mã phim">
  //             <p>{movieEdit?.maPhim}</p>
  //           </EditFilmGroup>

  //           <EditFilmGroup label="Ngày khởi chiếu">
  //             <DatePicker
  //               defaultValue={moment(
  //                 new Date(movieEdit?.ngayKhoiChieu).toLocaleDateString("vi-VI"),
  //                 "DD/MM/YYYY"
  //               )}
  //               control={control}
  //               onChange={onChangeDatePicker}
  //               format="DD/MM/YYYY"
  //             />
  //           </EditFilmGroup>

  //           <EditFilmGroup label="Tên Phim">
  //             <InputText
  //               name="movieName"
  //               type="text"
  //               control={control}
  //               className="form-film-input"
  //               defaultValue={movieEdit?.tenPhim}
  //             />
  //             <ErrorValidation errorMessage={errors.movieName?.message} />
  //           </EditFilmGroup>

  //           <EditFilmGroup label="Đang chiếu">
  //             <Controller
  //               control={control}
  //               name="showingMovie"
  //               defaultValue={movieEdit?.dangChieu}
  //               render={({ field: { onChange } }) => (
  //                 <Switch defaultChecked={movieEdit?.dangChieu} onChange={onChange} />
  //               )}
  //             />
  //           </EditFilmGroup>

  //           <EditFilmGroup label="Trailer">
  //             <InputText
  //               type="text"
  //               control={control}
  //               className="form-film-input"
  //               defaultValue={movieEdit?.trailer}
  //               name="movieUrlTrailer"
  //             />
  //             <ErrorValidation errorMessage={errors.movieUrlTrailer?.message} />
  //           </EditFilmGroup>

  //           <EditFilmGroup label="Sắp chiếu">
  //             <Controller
  //               control={control}
  //               name="comingSoonMovie"
  //               defaultValue={movieEdit?.sapChieu}
  //               render={({ field: { onChange } }) => (
  //                 <Switch defaultChecked={movieEdit?.sapChieu} onChange={onChange} />
  //               )}
  //             />
  //           </EditFilmGroup>

  //           <EditFilmGroup label="Đánh giá">
  //             <InputText
  //               type="number"
  //               control={control}
  //               className="form-film-input"
  //               defaultValue={movieEdit?.danhGia / 2}
  //               name="movieRating"
  //               min={1}
  //               max={5}
  //             />
  //             <ErrorValidation errorMessage={errors.movieRating?.message} />
  //           </EditFilmGroup>

  //           <EditFilmGroup label="Đang hot">
  //             <Controller
  //               control={control}
  //               name="hotMovie"
  //               defaultValue={movieEdit?.hot}
  //               render={({ field: { onChange } }) => (
  //                 <Switch defaultChecked={movieEdit?.hot} onChange={onChange} />
  //               )}
  //             />
  //           </EditFilmGroup>

  //           <EditFilmGroup label="Mô tả">
  //             <Controller
  //               control={control}
  //               name="movieDesc"
  //               defaultValue={movieEdit?.moTa}
  //               render={({ field: { onChange } }) => (
  //                 <TextArea
  //                   width={300}
  //                   rows={10}
  //                   defaultValue={movieEdit?.moTa}
  //                   onChange={onChange}
  //                 />
  //               )}
  //             />
  //             <ErrorValidation errorMessage={errors.movieDesc?.message} />
  //           </EditFilmGroup>

  //           <EditFilmGroup label="Thumbnail">
  //             <input type="file" accept="image/*" onChange={onUploadThumbnail} />
  //             {movieThumbPreviewUrl ? (
  //               <img className="form-film-thumbnail" src={movieThumbPreviewUrl} />
  //             ) : (
  //               <img className="form-film-thumbnail" src={movieEdit?.hinhAnh} />
  //             )}
  //           </EditFilmGroup>

  //           <button className="btn btn--primary" type="submit">
  //             Sửa
  //           </button>
  //         </form>
  //       </div>
  //     )}
  //   </>
  // );
};

const EditFilmGroup = ({ label, children }) => (
  <div className="form-film-group">
    <span className="form-film-label">{label}: </span>
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
