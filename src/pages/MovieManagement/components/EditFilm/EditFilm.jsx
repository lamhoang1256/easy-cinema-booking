import React, { useEffect, useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
// components
import { Input } from "antd";
import { Switch } from "antd";
import { DatePicker } from "antd";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import InputText from "components/Input/InputText";
import { moviesApi } from "apis/moviesApi";
import "./editFilm.scss";
// validation

const { RangePicker } = DatePicker;

const EditFilm = () => {
  const { TextArea } = Input;

  const [movieEdit, setMovieEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imgThumbnail, setImgThumbnail] = useState(null);

  const {
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  const fetchMovieEdit = async () => {
    setIsLoading(true);
    try {
      const { data } = await moviesApi.getMovieDetailApi("5397");
      setMovieEdit(data.content);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleEditMovie = (data) => {
    const requestEditMovie = {
      maPhim: "5397",
      tenPhim: data.movieName,
      trailer: data.movieUrlTrailer,
      moTa: data.movieDesc,
      maNhom: "GP00",
      ngayKhoiChieu: "21/01/2020",
      sapChieu: data.comingSoonMovie,
      dangChieu: data.showingMovie,
      hot: data.hotMovie,
      danhGia: data.movieRating,
      hinhAnh: imageURL,
    };
    let formData = new FormData();
    for (var key in requestEditMovie) {
      formData.append(key, requestEditMovie[key]);
    }
    // console.log(formData);
    const editMovie = async (formData) => {
      try {
        const res = await moviesApi.editMovieApi(formData);
        console.log(res);
      } catch (error) {
        console.log(error?.response?.data?.content);
      }
    };

    // editMovie(formData);
  };

  useEffect(() => {
    fetchMovieEdit();
  }, []);

  // Upload Image thumbnail

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }
  const [loadingImg, setLoadingImg] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  // console.log(imageURL);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoadingImg(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageURL) => {
        setImageURL(imageURL);
        setLoadingImg(false);
      });
    }
  };

  const uploadButton = (
    <div>
      {loadingImg ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      {isLoading && "Loading"}
      {!isLoading && (
        <div>
          <form className='edit-film' onSubmit={handleSubmit(handleEditMovie)}>
            <EditFilmGroup label='Tên Phim'>
              <InputText
                name='movieName'
                type='text'
                control={control}
                className='edit-film-input'
                defaultValue={movieEdit.tenPhim}
              />
            </EditFilmGroup>

            <EditFilmGroup label='Đang chiếu'>
              <Controller
                control={control}
                name='showingMovie'
                defaultValue={movieEdit.dangChieu}
                render={({ field: { onChange, value } }) => (
                  <Switch defaultChecked={movieEdit.dangChieu} onChange={onChange} />
                )}
              />
            </EditFilmGroup>

            <EditFilmGroup label='Trailer'>
              <InputText
                type='text'
                control={control}
                className='edit-film-input'
                defaultValue={movieEdit.trailer}
                name='movieUrlTrailer'
              />
            </EditFilmGroup>

            <EditFilmGroup label='Sắp chiếu'>
              <Controller
                control={control}
                name='comingSoonMovie'
                defaultValue={movieEdit.sapChieu}
                render={({ field: { onChange, value } }) => (
                  <Switch defaultChecked={movieEdit.sapChieu} onChange={onChange} />
                )}
              />
            </EditFilmGroup>

            <EditFilmGroup label='Đánh giá'>
              <InputText
                type='text'
                control={control}
                className='edit-film-input'
                defaultValue={movieEdit.danhGia / 2}
                name='movieRating'
              />
            </EditFilmGroup>

            <EditFilmGroup label='Đang hot'>
              <Controller
                control={control}
                name='hotMovie'
                defaultValue={movieEdit.hot}
                render={({ field: { onChange, value } }) => (
                  <Switch defaultChecked={movieEdit.hot} onChange={onChange} />
                )}
              />
            </EditFilmGroup>

            <EditFilmGroup label='Mô tả'>
              <Controller
                control={control}
                name='movieDesc'
                defaultValue={movieEdit.moTa}
                render={({ field: { onChange, value } }) => (
                  <TextArea
                    width={300}
                    rows={7}
                    defaultValue={movieEdit.moTa}
                    onChange={onChange}
                  />
                )}
              />
            </EditFilmGroup>

            <EditFilmGroup label='Thumbnail'>
              <Upload
                name='thumbnailMovie'
                listType='picture-card'
                className='avatar-uploader'
                showUploadList={false}
                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageURL ? (
                  <img src={imageURL} alt='avatar' style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </EditFilmGroup>

            <EditFilmGroup label='Ngày khởi chiếu'>
              <DatePicker
                defaultValue={moment(
                  new Date(movieEdit.ngayKhoiChieu).toLocaleDateString("vi-VI"),

                  "DD/MM/YYYY"
                )}
                format='DD/MM/YYYY'
              />
            </EditFilmGroup>

            <button className='btn btn--primary' type='submit'>
              Sửa
            </button>
          </form>
        </div>
      )}
    </>
  );
};

const EditFilmGroup = ({ label, children }) => (
  <div className='edit-film-group'>
    <span className='edit-film-label'>{label}: </span>
    {children}
  </div>
);

export default EditFilm;

// biDanh: "wanted-2"
// dangChieu: true
// danhGia: 10
// hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/wanted2_gp13.jpg"
// hot: false
// maNhom: "GP13"
// maPhim: 8188
// moTa: "Wanted is a 2008 American action thriller film directed by Timur Bekmambetov and written by Michael Brandt, Derek Haas, and Chris Morgan, loosely based on the comic book miniseries by Mark Millar and J. G. Jones. The film stars James McAvoy, Morgan Freeman, Terence Stamp, Thomas Kretschmann, Common, and Angelina Jolie.nn"
// ngayKhoiChieu: "2021-11-09T01:46:29.307"
// sapChieu: false
// tenPhim: "Wanted 2"
// trailer: "https://www.youtube.com/embed/-TJ0o4oB0gc"
