import { yupResolver } from "@hookform/resolvers/yup";
import { moviesApi } from "apis/moviesApi";
import Button from "components/button/Button";
import Field from "components/field/Field";
import Input from "components/input/Input";
import Label from "components/label/Label";
import LabelError from "components/label/LabelError";
import { schemaShowtime } from "constants/showtime.schema";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const StyledShowtimeUpdate = styled.div``;

const ShowtimeUpdate = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [showtime, setShowtime] = useState(null);
  const handleUpdateShowtime = async (values) => {
    console.log(values);
    try {
      const { data } = await moviesApi.showtimeUpdate(id, values);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchShowtimeNeedUpdate = async () => {
    setLoading(true);
    try {
      const { data } = await moviesApi.showtimeGetSingle(id);
      setShowtime(data.data.showtime);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log(showtime);
  useEffect(() => {
    fetchShowtimeNeedUpdate();
  }, [id]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaShowtime) });

  if (loading) return "Loading";

  let date = showtime.startTime.split(":");
  date.pop();
  const startTime = date.join(":");

  return (
    <StyledShowtimeUpdate>
      <form onSubmit={handleSubmit(handleUpdateShowtime)}>
        <div className="gird-layout">
          <Field>
            <Label htmlFor="movieId">Movie Id</Label>
            <Input
              placeholder="Movie Id"
              name="movieId"
              defaultValue={showtime.movie.id}
              type="number"
              control={control}
            />
            <LabelError>{errors.movieId?.message} </LabelError>
          </Field>
          <Field>
            <Label htmlFor="screenId">Screen Id</Label>
            <Input
              placeholder="Screen Id"
              name="screenId"
              defaultValue={showtime.screen.id}
              type="number"
              control={control}
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
              defaultValue={startTime}
              type="datetime-local"
              control={control}
            />
            <LabelError>{errors.startTime?.message} </LabelError>
          </Field>
          <Field>
            <Label htmlFor="price">Price</Label>
            <Input
              placeholder="Price"
              name="price"
              defaultValue={showtime.tickets[0].price}
              type="number"
              control={control}
            />
            <LabelError>{errors.price?.message} </LabelError>
          </Field>
        </div>
        <Button type="submit">Add new showtime</Button>
      </form>
    </StyledShowtimeUpdate>
  );
};

export default ShowtimeUpdate;
