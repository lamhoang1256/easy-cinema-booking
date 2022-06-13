import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Image = ({ to, url, alt, className }) => {
  if (to) {
    return (
      <Link to={to}>
        <LazyLoadImage className={className} src={url} effect="opacity" alt={alt} />
      </Link>
    );
  }
  return <LazyLoadImage className={className} src={url} effect="opacity" alt={alt} />;
};

Image.defaultProps = {
  to: "",
  alt: "",
  className: "",
};

export default Image;
