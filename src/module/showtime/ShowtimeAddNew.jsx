import { yupResolver } from "@hookform/resolvers/yup";
import { configAPI } from "apis/configAPI";
import Button from "components/button/Button";
import Field from "components/field/Field";
import Input from "components/input/Input";
import Label from "components/label/Label";
import LabelError from "components/label/LabelError";
import { schemaShowtime } from "constants/showtime.schema";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { Select } from "antd";
import { useEffect, useState } from "react";
import ImageResize from "components/image/ImageResize";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const StyledShowtimeAddNew = styled.div`
  .select {
    width: 100%;
    height: 50px;
  }
  .select .ant-select-selector {
    background: transparent;
    height: 50px;
    color: var(--white);
    border: 1px solid #656293;
    border-radius: 6px;
  }
  .ant-select:hover .ant-select-selector {
    border-color: var(--primary-color) !important;
  }
  .select .ant-select-selection-item {
    line-height: 50px;
  }
  .select .ant-select-selection-placeholder {
    color: #757563;
    font-size: 1.8rem;
    line-height: 50px;
  }
`;

const ShowtimeAddNew = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [screens, setScreens] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaShowtime) });

  const fetchMovies = async () => {
    try {
      const { data } = await configAPI.movieGetAll();
      setMovies(data.data.movies);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchScreens = async () => {
    try {
      const { data } = await configAPI.screenGetAll();
      setScreens(data.data.screens);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNewShowtime = async (values) => {
    try {
      const { data } = await configAPI.showtimeAddNew(values);
      if (data?.status === "success") toast.success("Add new showtime successfully");
      navigate("/admin/showtime-manage");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchScreens();
  }, []);

  return (
    <StyledShowtimeAddNew>
      <form onSubmit={handleSubmit(handleAddNewShowtime)}>
        <div className="gird-layout">
          <Field>
            <Label htmlFor="movieId">Movie Id</Label>
            <Controller
              control={control}
              name="movieId"
              render={({ field: { onChange } }) => (
                <Select placeholder="Movie Id" onChange={onChange} className="select">
                  {movies?.map((movie) => (
                    <Option value={movie.id} key={movie.id}>
                      <div className="select-movie">
                        <ImageResize
                          width="40"
                          className="select-poster"
                          url={movie.poster}
                          alt="poster"
                        />
                        <span>{movie.name}</span>
                      </div>
                    </Option>
                  ))}
                </Select>
              )}
            />
            <LabelError>{errors.movieId?.message} </LabelError>
          </Field>
          <Field>
            <Label htmlFor="screenId">Screen Id</Label>
            <Controller
              control={control}
              name="screenId"
              render={({ field: { onChange } }) => (
                <Select placeholder="Screen Id" onChange={onChange} className="select">
                  {screens?.map((screen) => (
                    <Option value={screen.id} key={screen.id}>
                      {screen.name}
                    </Option>
                  ))}
                </Select>
              )}
            />
            <LabelError>{errors.screenId?.message} </LabelError>
          </Field>
        </div>
        <div className="gird-layout">
          <Field>
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              placeholder="Start Time"
              name="startTime"
              type="datetime-local"
              control={control}
            />
            <LabelError>{errors.startTime?.message} </LabelError>
          </Field>
          <Field>
            <Label htmlFor="price">Price</Label>
            <Input placeholder="Price" name="price" type="number" control={control} />
            <LabelError>{errors.price?.message} </LabelError>
          </Field>
        </div>
        <Button type="submit">Add new showtime</Button>
      </form>
    </StyledShowtimeAddNew>
  );
};

export default ShowtimeAddNew;
