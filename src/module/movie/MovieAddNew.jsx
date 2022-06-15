import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker, Switch } from "antd";
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

const MovieAddNew = () => {
  const [poster, setPoster] = useState(null);
  const [releasedOn, setReleasedOn] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaYupFilm) });

  const onChangeDatePicker = (value) => {
    setReleasedOn(moment(value).format("DD/MM/YYYY"));
  };

  const handleAddMovie = (data) => {
    console.log(poster);
    const values = {
      tenPhim: data.title,
      moTa: data.description,
      trailer: data.trailer,
      maNhom: "GP00",
      ngayKhoiChieu: releasedOn || moment(new Date()).format("DD/MM/YYYY"),
      sapChieu: data.isComming,
      dangChieu: data.isShowing,
      hot: data.isHot,
      danhGia: data.rating * 2,
      hinhAnh: poster,
    };

    let formData = new FormData();
    for (var key in values) {
      if (key !== "hinhAnh") {
        formData.append(key, values[key]);
      } else {
        if (values.hinhAnh !== null)
          formData.append("hinhAnh", values.hinhAnh, values.hinhAnh.name);
      }
    }

    (async () => {
      try {
        const res = await moviesApi.addNewMovieApi(formData);
        if (res.status === 200) {
          sweetAlert("success", "Thêm mới phim thành công!", "Bạn đã thêm mới phim thành công!");
        }
      } catch (error) {
        sweetAlert("error", "Thêm mới phim thất bại!", error?.response?.data?.content);
      }
    })();
  };

  return (
    <StyledMovieAddNew>
      <h2>Thêm phim mới</h2>
      <form className="movie" onSubmit={handleSubmit(handleAddMovie)}>
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
            <Input placeholder="Tên phim" name="title" type="text" control={control} />
            <LabelError>{errors.title?.message} </LabelError>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="rating">Đánh giá</Label>
            <Input type="number" control={control} name="rating" />
            <LabelError>{errors.rating?.message}</LabelError>
          </Field>
          <Field>
            <Label htmlFor={"trailer"}>Trailer</Label>
            <Input type="text" control={control} name="trailer" />
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
                defaultValue={false}
                render={({ field: { onChange } }) => <Switch onChange={onChange} />}
              />
            </Field>
            <Field>
              <Label htmlFor="isComming">Sắp chiếu</Label>
              <Controller
                control={control}
                name="isComming"
                defaultValue={false}
                render={({ field: { onChange } }) => <Switch onChange={onChange} />}
              />
            </Field>
            <Field>
              <Label htmlFor="isHot">Đang hot</Label>
              <Controller
                control={control}
                name="isHot"
                defaultValue={false}
                render={({ field: { onChange } }) => <Switch onChange={onChange} />}
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
              defaultValue=""
              render={({ field: { onChange } }) => <TextArea onChange={onChange} />}
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
