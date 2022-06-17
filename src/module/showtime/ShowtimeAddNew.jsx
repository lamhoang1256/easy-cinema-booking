import { yupResolver } from "@hookform/resolvers/yup";
import { moviesApi } from "apis/moviesApi";
import Button from "components/button/Button";
import Field from "components/field/Field";
import Input from "components/input/Input";
import Label from "components/label/Label";
import LabelError from "components/label/LabelError";
import { schemaShowtime } from "constants/showtime.schema";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const StyledShowtimeAddNew = styled.div``;

const ShowtimeAddNew = () => {
  const handleAddNewShowtime = async (values) => {
    console.log(values);
    try {
      const { data } = await moviesApi.showtimeAddNew(values);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaShowtime) });

  return (
    <StyledShowtimeAddNew>
      <form onSubmit={handleSubmit(handleAddNewShowtime)}>
        <div className="gird-layout">
          <Field>
            <Label htmlFor="movieId">Movie Id</Label>
            <Input placeholder="Movie Id" name="movieId" type="number" control={control} />
            <LabelError>{errors.movieId?.message} </LabelError>
          </Field>
          <Field>
            <Label htmlFor="screenId">Screen Id</Label>
            <Input placeholder="Screen Id" name="screenId" type="number" control={control} />
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
