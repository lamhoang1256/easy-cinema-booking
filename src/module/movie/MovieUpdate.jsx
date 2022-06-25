import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker } from "antd";
import { configAPI } from "apis/configAPI";
import Button from "components/button/Button";
import Field from "components/field/Field";
import ImageUpload from "components/image/ImageUpload";
import Input from "components/input/Input";
import Label from "components/label/Label";
import LabelError from "components/label/LabelError";
import LoadingSpinner from "components/loading/LoadingSpinner";
import TextArea from "components/textarea/TextArea";
import { path } from "constants/path";
import { schemaYupFilm } from "constants/yupSchema";
import moment from "moment";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

const StyledMovieUpdate = styled.div`
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
    margin-top: 20px;
    width: 100%;
  }
`;

const MovieUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [poster, setPoster] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaYupFilm),
    defaultValues: {
      name: "",
      description: "",
      trailer: "",
      duration: "",
      rating: "",
      tmdbId: "0",
      releaseDate: "",
    },
  });

  const fetchMovieNeedUpdate = async () => {
    setLoading(true);
    try {
      const { data } = await configAPI.movieGetDetail(id);
      reset(data.data.movie);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleUpdateMovie = (req) => {
    const updates = {
      name: req.name,
      description: req.description,
      trailer: req.trailer,
      releaseDate: req.releaseDate,
      status: "now-showing",
      rating: req.rating,
      duration: req.duration,
      tmdbId: req.tmdbId,
      poster: poster,
    };
    const updateMovie = async () => {
      try {
        let formData = new FormData();
        for (const key in updates) {
          formData.append(key, updates[key]);
        }
        const { data } = await configAPI.movieUpdate(id, formData);
        if (data?.status === "success") toast.success("Movie updated successfully");
        navigate(path.movieManage);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };
    updateMovie();
  };

  useEffect(() => {
    fetchMovieNeedUpdate();
  }, []);

  if (loading) return <LoadingSpinner />;
  return (
    <StyledMovieUpdate>
      <h2>Update movie</h2>
      <form className="movie" onSubmit={handleSubmit(handleUpdateMovie)}>
        <div className="form-layout">
          <Field>
            <Label>Release Date</Label>
            <Input placeholder="Release Date" name="releaseDate" type="date" control={control} />
            <LabelError>{errors.releaseDate?.message}</LabelError>
          </Field>
          <Field>
            <Label htmlFor="name">Name</Label>
            <Input placeholder="Name" name="name" type="text" control={control} />
            <LabelError>{errors.name?.message}</LabelError>
          </Field>
        </div>
        <div className="form-layout">
          <div className="form-layout-3">
            <Field>
              <Label htmlFor="rating">Rating</Label>
              <Input placeholder="Rating" type="number" control={control} name="rating" />
              <LabelError>{errors.rating?.message}</LabelError>
            </Field>
            <Field>
              <Label htmlFor="duration">Duration</Label>
              <Input placeholder="Duration" type="number" control={control} name="duration" />
              <LabelError>{errors.duration?.message}</LabelError>
            </Field>
            <Field>
              <Label htmlFor="tmdbId">IdTmdb (optional)</Label>
              <Input name="tmdbId" placeholder="tmdbId" type="number" control={control} />
            </Field>
          </div>
          <Field>
            <Label htmlFor={"trailer"}>Trailer</Label>
            <Input
              type="text"
              placeholder="Ex: https://www.youtube.com/watch?v=dd_R1GQwKlY"
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
          <Field>
            <Label htmlFor="description">Description</Label>
            <TextArea control={control} name="description" placeholder="Description" />
            <LabelError>{errors.description?.message} </LabelError>
          </Field>
        </div>
        <Button kind="purple" type="submit" className="button-full">
          Update movie
        </Button>
      </form>
    </StyledMovieUpdate>
  );
};

export default MovieUpdate;
