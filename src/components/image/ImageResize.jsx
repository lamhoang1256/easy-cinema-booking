import { LazyLoadImage } from "react-lazy-load-image-component";
import { resizeImage } from "constants/resizeImage";
import { Link } from "react-router-dom";

const ImageResize = ({ to, url, width, height, alt, className }) => {
  if (to) {
    return (
      <Link to={to}>
        <LazyLoadImage
          className={className}
          src={resizeImage(url, width, height)}
          effect="opacity"
          alt={alt}
        />
      </Link>
    );
  }
  return (
    <LazyLoadImage
      className={className}
      src={resizeImage(url, width, height)}
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