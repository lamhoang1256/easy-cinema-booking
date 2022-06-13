import classNames from "classnames/bind";
import styles from "./sliderArrow.module.scss";

const styled = classNames.bind(styles);

export const SliderArrow = (props) => {
  const { className, style, onClick, children } = props;
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <div className={styled("slider-icon")}>{children}</div>
    </div>
  );
};
