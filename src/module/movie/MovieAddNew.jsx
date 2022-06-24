import { path } from "constants/path";
import { schemaYupFilm } from "constants/yupSchema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { configAPI } from "apis/configAPI";
import Button from "components/button/Button";
import Field from "components/field/Field";
import ImageUpload from "components/image/ImageUpload";
import Input from "components/input/Input";
import Label from "components/label/Label";
import LabelError from "components/label/LabelError";
import TextArea from "components/textarea/TextArea";

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
    margin-top: 20px;
    width: 100%;
  }
`;

const MovieAddNew = () => {
  const navigate = useNavigate();
  const [poster, setPoster] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaYupFilm),
    defaultValues: {
      tmdbId: "0",
    },
  });

  const handleAddNewMovie = (req) => {
    const body = {
      name: req.name,
      description: req.description,
      trailer: req.trailer,
      releaseDate: req.releaseDate,
      status: "now-showing",
      rating: req.rating,
      duration: req.duration,
      poster: poster,
      tmdbId: req.tmdbId,
    };
    const addNewMovie = async () => {
      try {
        let formData = new FormData();
        for (const key in body) {
          formData.append(key, body[key]);
        }
        const { data } = await configAPI.movieAddNew(formData);
        if (data?.status === "success") {
          toast.success("Add new movie successfully");
          navigate(path.movieManage);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };
    addNewMovie();
  };

  return (
    <StyledMovieAddNew>
      <h2>Add new movie</h2>
      <form className="movie" onSubmit={handleSubmit(handleAddNewMovie)}>
        <div className="form-layout">
          <Field>
            <Label>Release Date</Label>
            <Input placeholder="Release Date" name="releaseDate" type="date" control={control} />
            <LabelError>{errors.releaseDate?.message} </LabelError>
          </Field>
          <Field>
            <Label htmlFor="name">Name</Label>
            <Input placeholder="Name" name="name" type="text" control={control} />
            <LabelError>{errors.name?.message} </LabelError>
          </Field>
        </div>
        <div className="form-layout">
          <div className="form-layout-3">
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
            <Field>
              <Label htmlFor="tmdbId">IdTmdb (optional)</Label>
              <Input name="tmdbId" placeholder="tmdbId" type="number" control={control} />
            </Field>
          </div>
          <Field>
            <Label htmlFor={"trailer"}>Trailer</Label>
            <Input
              name="trailer"
              placeholder="Ex: https://www.youtube.com/watch?v=dd_R1GQwKlY"
              type="text"
              control={control}
            />
            <LabelError>{errors.trailer?.message}</LabelError>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="poster">Poster</Label>
            <ImageUpload setImage={setPoster}></ImageUpload>
          </Field>
          <Field>
            <Label htmlFor="description">Description</Label>
            <TextArea
              name="description"
              control={control}
              placeholder="Description"
              className="textarea"
            />
            <LabelError>{errors.description?.message} </LabelError>
          </Field>
        </div>
        <Button kind="purple" type="submit" className="submit">
          Add new movie
        </Button>
      </form>
    </StyledMovieAddNew>
  );
};

export default MovieAddNew;
