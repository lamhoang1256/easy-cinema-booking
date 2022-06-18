import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker } from "antd";
import { moviesApi } from "apis/moviesApi";
import Button from "components/button/Button";
import Field from "components/field/Field";
import ImageUpload from "components/image/ImageUpload";
import Input from "components/input/Input";
import Label from "components/label/Label";
import LabelError from "components/label/LabelError";
import TextArea from "components/textarea/TextArea";
import { schemaYupFilm } from "constants/movie.schema";
import moment from "moment";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { sweetAlert } from "utilities/sweetAlert";

const StyledMovieAddNew = styled.div`
  button {
    width: max-content;
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

const MovieAddNew = () => {
  const [poster, setPoster] = useState(null);
  const [releasedOn, setReleasedOn] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaYupFilm) });

  const onChangeDatePicker = (value) => {
    setReleasedOn(moment(value).format("YYYY-MM-DD"));
  };

  const handleAddNewMovie = (req) => {
    const newMovie = {
      name: req.title,
      description: req.description,
      trailer: req.trailer,
      releaseDate: releasedOn,
      status: "now-showing",
      rating: req.rating,
      duration: req.duration,
      poster: poster,
    };
    const addNewMovie = async () => {
      try {
        let formData = new FormData();
        for (const key in newMovie) {
          formData.append(key, newMovie[key]);
        }
        const { data } = await moviesApi.movieAddNew(formData);
        // notification
        if (data?.status === "success") {
          sweetAlert("success", "Thêm mới phim thành công!", "Bạn đã thêm mới phim thành công!");
        }
      } catch (error) {
        sweetAlert("error", "Thêm mới phim thất bại!", error?.response?.data?.content);
      }
    };
    addNewMovie();
  };

  return (
    <StyledMovieAddNew>
      <h2>Thêm phim mới</h2>
      <form className="movie" onSubmit={handleSubmit(handleAddNewMovie)}>
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
            <Label htmlFor="title">Name</Label>
            <Input placeholder="Name" name="title" type="text" control={control} />
            <LabelError>{errors.title?.message} </LabelError>
          </Field>
        </div>
        <div className="form-layout">
          <div className="form-layout">
            <Field>
              <Label htmlFor="rating">Rating</Label>
              <Input name="rating" placeholder="Rating" type="number" control={control} />
              <LabelError>{errors.rating?.message}</LabelError>
            </Field>
            <Field>
              <Label htmlFor="duration">Duration</Label>
              <Input name="duration" placeholder="Duration" type="number" control={control} />
              <LabelError>{errors.duration?.message}</LabelError>
            </Field>
          </div>
          <Field>
            <Label htmlFor={"trailer"}>Trailer</Label>
            <Input name="trailer" placeholder="Trailer" type="text" control={control} />
            <LabelError>{errors.trailer?.message}</LabelError>
          </Field>
        </div>
        <Field>
          <Label>Poster</Label>
          <ImageUpload setImage={setPoster}></ImageUpload>
        </Field>
        <Field>
          <Label htmlFor="description">Description</Label>
          <div className="description">
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field: { onChange } }) => (
                <TextArea placeholder="Description" onChange={onChange} />
              )}
            />
          </div>
          <LabelError>{errors.description?.message} </LabelError>
        </Field>
        <Button kind="purple" type="submit" className="submit">
          Sửa
        </Button>
      </form>
    </StyledMovieAddNew>
  );
};

export default MovieAddNew;
