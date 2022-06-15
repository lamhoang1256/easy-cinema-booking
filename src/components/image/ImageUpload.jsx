import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "./Image";

const StyledImageUpload = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid var(--purple-color);
  border-radius: 8px;
  overflow: hidden;
  min-height: 250px;
  .thumbnail {
    width: 100px;
  }
  .preview {
    position: absolute;
    inset: 0;
    background-color: var(--white);
  }
  input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }
`;

const ImageUpload = (props) => {
  const { setImage = () => {} } = props;
  const [urlPreview, setUrlPreview] = useState("");
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImage(file);
    setUrlPreview(file.preview);
  };
  // clear before preview image when change image upload
  useEffect(() => {
    return () => {
      urlPreview && URL.revokeObjectURL(urlPreview);
    };
  }, [urlPreview]);

  return (
    <StyledImageUpload>
      <Image url="/images/img-upload.png" alt="upload" className="thumbnail"></Image>
      {urlPreview && <Image url={urlPreview} className="preview" alt="preview" />}
      <h3>Choose Photo</h3>
      <input type="file" onChange={handlePreviewAvatar} />
    </StyledImageUpload>
  );
};

export default ImageUpload;
