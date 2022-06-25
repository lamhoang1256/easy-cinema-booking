import { yupResolver } from "@hookform/resolvers/yup";
import { configAPI } from "apis/configAPI";
import Button from "components/button/Button";
import Field from "components/field/Field";
import Input from "components/input/Input";
import Label from "components/label/Label";
import LabelError from "components/label/LabelError";
import LoadingSpinner from "components/loading/LoadingSpinner";
import { schemaShowtime } from "constants/yupSchema";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Select } from "antd";
import ImageResize from "components/image/ImageResize";
import { Controller } from "react-hook-form";
import { path } from "constants/path";
const { Option } = Select;

const StyledShowtimeUpdate = styled.div`
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

const ShowtimeUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [showtime, setShowtime] = useState([]);
  const [movies, setMovies] = useState([]);
  const [screens, setScreens] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaShowtime),
    defaultValues: {
      movieId: 0,
      screenId: 0,
      startTime: "",
      price: 0,
    },
  });

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
  const fetchShowtimeNeedUpdate = async () => {
    setLoading(true);
    try {
      const { data } = await configAPI.showtimeGetSingle(id);
      setShowtime(data.data.showtime);
      const { tickets, startTime } = data.data.showtime;
      reset({ price: tickets?.[0]?.price, startTime });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleUpdateShowtime = async (values) => {
    try {
      const { data } = await configAPI.showtimeUpdate(id, values);
      if (data?.status === "success") toast.success("Showtime updated successfully");
      navigate(path.showtimeManage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchShowtimeNeedUpdate();
    fetchMovies();
    fetchScreens();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  return (
    <StyledShowtimeUpdate>
      <form onSubmit={handleSubmit(handleUpdateShowtime)}>
        <div className="gird-layout">
          <Field>
            <Label htmlFor="movieId">Movie Id</Label>
            <Controller
              name="movieId"
              control={control}
              defaultValue={showtime?.movie.id}
              render={({ field: { onChange } }) => (
                <Select
                  defaultValue={showtime?.movie.id}
                  placeholder="Movie Id"
                  onChange={onChange}
                  className="select"
                >
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
              defaultValue={showtime?.screen.id}
              render={({ field: { onChange } }) => (
                <Select
                  placeholder="Screen Id"
                  defaultValue={showtime?.screen.id}
                  onChange={onChange}
                  className="select"
                >
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
        <Button kind="purple" type="submit">
          Update showtime
        </Button>
      </form>
    </StyledShowtimeUpdate>
  );
};

export default ShowtimeUpdate;
