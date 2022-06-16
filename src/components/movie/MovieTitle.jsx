import PropTypes from "prop-types";
import styled from "styled-components";
import { TextClamp } from "assets/styles/_mixin";
import { Link } from "react-router-dom";

const StyledMovieTitle = styled.h3`
  margin: 10px 0 6px;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--gray-lighter);
  ${TextClamp.multilines(2)};
  a {
    color: var(--gray-lighter);
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
