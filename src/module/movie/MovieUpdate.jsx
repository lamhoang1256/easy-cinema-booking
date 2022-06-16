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
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [poster, setPoster] = useState(null);
  const [releasedOn, setReleasedOn] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaYupFilm) });

  const fetchMovieEdit = async () => {
    setLoading(true);
    try {
      const { data } = await moviesApi.movieDetailApi(idMovieEdit);
      setMovie(data.data.movie);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onChangeReleaseOn = (date) => {
    setReleasedOn(moment(date).format("YYYY-MM-DD"));
  };

  const handleUpdateMovie = (req) => {
    const updates = {
      name: req.title,
      description: req.description,
      trailer: req.trailer,
      releaseDate: releasedOn,
      status: "now-showing",
      rating: req.rating,
      duration: req.duration,
      poster: poster,
    };
    const updateMovie = async () => {
      try {
        let formData = new FormData();
        for (const key in updates) {
          formData.append(key, updates[key]);
        }
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
    };
    updateMovie();
  };

  useEffect(() => {
    fetchMovieEdit();
  }, []);

  if (loading) return "Loading";
  console.log(movie);
  return (
    <StyledMovieUpdate>
      <h2>Thêm phim mới</h2>
      <form className="movie" onSubmit={handleSubmit(handleUpdateMovie)}>
        <div className="form-layout">
          <Field>
            <Label>Ngày khởi chiếu</Label>
            <DatePicker
              className="date"
              defaultValue={moment(new Date(), "DD/MM/YYYY")}
              control={control}
              onChange={onChangeReleaseOn}
              format="DD/MM/YYYY"
            />
          </Field>
          <Field>
            <Label htmlFor="title">Name</Label>
            <Input
              placeholder="Name"
              name="title"
              type="text"
              defaultValue={movie?.name}
              control={control}
            />
            <LabelError>{errors.title?.message} </LabelError>
          </Field>
        </div>
        <div className="form-layout">
          <div className="form-layout">
            <Field>
              <Label htmlFor="rating">Rating</Label>
              <Input
                placeholder="Rating"
                type="number"
                defaultValue={movie?.rating}
                control={control}
                name="rating"
              />
              <LabelError>{errors.rating?.message}</LabelError>
            </Field>
            <Field>
              <Label htmlFor="duration">Duration</Label>
              <Input
                placeholder="Duration"
                type="number"
                defaultValue={movie?.duration}
                control={control}
                name="duration"
              />
              <LabelError>{errors.duration?.message}</LabelError>
            </Field>
          </div>
          <Field>
            <Label htmlFor={"trailer"}>Trailer</Label>
            <Input
              type="text"
              placeholder="Trailer"
              defaultValue={movie?.trailer}
              control={control}
              name="trailer"
            />
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
              defaultValue={movie?.description}
              name="description"
              render={({ field: { onChange } }) => (
                <TextArea
                  onChange={onChange}
                  placeholder="Description"
                  defaultValue={movie?.description}
                />
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
