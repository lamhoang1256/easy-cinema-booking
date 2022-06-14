import styled from "styled-components";
const StyledSliderArrow = styled.div`
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

export const SliderArrow = (props) => {
  const { className, style, onClick, children } = props;
  return (
    <StyledSliderArrow
      aria-hidden="true"
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <div className="icon">{children}</div>
    </StyledSliderArrow>
  );
};
