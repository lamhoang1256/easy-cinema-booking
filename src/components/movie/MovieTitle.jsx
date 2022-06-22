import styled from "styled-components";
import PropTypes from "prop-types";
import { TextClamp } from "assets/styles/mixin";
import { Link } from "react-router-dom";

const StyledMovieTitle = styled.h3`
  margin: 10px 0 6px;
  font-size: 1.4rem;
  ${TextClamp.multilines(2)};
  a {
    font-weight: 500;
    color: var(--white);
    transition: all 0.25s linear;
  }
  &:hover a {
    color: #8a3cff;
  }
`;

const MovieTitle = ({ to, children }) => {
  if (to)
    return (
      <StyledMovieTitle>
        <Link to={to}>{children}</Link>
      </StyledMovieTitle>
    );
  return <StyledMovieTitle>MovieTitle</StyledMovieTitle>;
};

MovieTitle.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default MovieTitle;
