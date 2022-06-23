import { LazyLoadImage } from "react-lazy-load-image-component";
import { path } from "constants/path";
import { Link } from "react-router-dom";
import { useState } from "react";

const ImageResize = ({
  to,
  url,
  width,
  height,
  alt,
  className,
  imageError = "/images/no-image.png",
}) => {
  const [fallback, setFallback] = useState("");
  const handleErrorImage = () => {
    setFallback(imageError);
  };
  if (to) {
    return (
      <Link to={to}>
        <LazyLoadImage
          onError={handleErrorImage}
          className={className}
          src={fallback || path.resizeImage(url, width, height)}
          effect="opacity"
          alt={alt}
        />
      </Link>
    );
  }
  return (
    <LazyLoadImage
      onError={handleErrorImage}
      className={className}
      src={fallback || path.resizeImage(url, width, height)}
      effect="opacity"
      alt={alt}
    />
  );
};

ImageResize.defaultProps = {
  to: "",
  height: "",
  width: "",
  alt: "",
  className: "",
};

export default ImageResize;
