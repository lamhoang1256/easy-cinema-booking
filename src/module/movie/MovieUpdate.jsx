import moment from "moment";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { DatePicker } from "antd";
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
import TextArea from "components/textarea/TextArea";

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

const MovieUpdate = () => {
  const { idMovieEdit } = useParams();
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
      const { data } = await moviesApi.movieDetailApi(idMovieEdit);
      setMovieEdit(data.data.movie);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  console.log(movieEdit);
  const onChangeDatePicker = (value) => {
    setReleasedOn(moment(value).format("DD/MM/YYYY"));
  };

  const handleEditMovie = (data) => {
    const requestEditMovie = {
      id: 14,
      name: "NGHỀ SIÊU DỄ",
      description:
        "Doraemon: Nobita và Cuộc Chiến Vũ Trụ Tí Hon 2022 là một lựa chọn cực kỳ sáng suốt trong dịp Tết Thiếu Nhi 2022 sắp đến. Một bom tấn đúng nghĩa dành cho tất cả mọi người, từ già trẻ lớn bé...",
      trailer: "https://www.youtube.com/watch?v=Nm0ImwyPaVE",
      rating: 4.9,
      duration: 113,
      status: "now-showing",
      releaseDate: "2022-04-29",
      // name: data.title,
      // description: data.description,
      // trailer: data.trailer,
      // releaseDate: "2022-09-13",
      // status: "now-showing",
      // rating: data.rating,
      // duration: 100,
      poster: poster,
    };
    let formData = new FormData();
    for (var key in requestEditMovie) {
      formData.append(key, requestEditMovie[key]);
    }
    (async () => {
      try {
        const response = await moviesApi.movieUpdate(idMovieEdit, formData);
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
              defaultValue={movieEdit?.name}
              control={control}
            />
            <LabelError>{errors.title?.message} </LabelError>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="rating">Đánh giá</Label>
            <Input type="number" defaultValue={movieEdit?.rating} control={control} name="rating" />
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
        </div>
        <Field>
          <Label htmlFor="description">Description</Label>
          <div className="description">
            <Controller
              control={control}
              defaultValue={movieEdit?.description}
              name="description"
              render={({ field: { onChange } }) => (
                <TextArea onChange={onChange} defaultValue={movieEdit?.description} />
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
};

export default MovieUpdate;
