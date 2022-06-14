import "./banner.scss";

const Banner = ({ urlBanner, heading }) => {
  return (
    <div className="container">
      <div className="banner" style={{ backgroundImage: urlBanner }}>
        <h2 className="banner-heading">{heading}</h2>
      </div>
    </div>
  );
};

export default Banner;
