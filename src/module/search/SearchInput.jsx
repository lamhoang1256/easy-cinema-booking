import styled from "styled-components";

const StyledSearchInput = styled.div`
  input {
    padding: 0 20px;
    height: ${(props) => props.height};
    background-color: transparent;
    border: 1px solid var(--primary-color);
    border-radius: 6px;
    width: 100%;
    color: var(--white);
  }
`;

const SearchInput = ({ height = "44px", setSearchValue, placeholder = "Search...", ...props }) => {
  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <StyledSearchInput {...props} height={height}>
      <input type="text" placeholder={placeholder} onChange={onChangeSearch} />
    </StyledSearchInput>
  );
};

export default SearchInput;
