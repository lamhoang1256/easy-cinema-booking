import { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Image = ({ to, url, alt, className, imageError = "/images/no-image.png" }) => {
  const [fallback, setFallback] = useState("");
  const handleErrorImage = () => {
    setFallback(imageError);
  };
  if (to) {
    return (
      <Link to={to}>
        <LazyLoadImage
          className={className}
          src={fallback || url}
          effect="opacity"
          alt={alt}
          onError={handleErrorImage}
        />
      </Link>
    );
  }
  return (
    <LazyLoadImage
      className={className}
      src={fallback || url}
      effect="opacity"
      alt={alt}
      onError={handleErrorImage}
    />
  );
};

Image.defaultProps = {
  to: "",
  alt: "",
  className: "",
};

export default Image;
