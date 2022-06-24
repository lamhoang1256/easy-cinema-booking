import styled from "styled-components";

const StyledSearch = styled.div`
  input {
    padding: 0 20px;
    height: 44px;
    background-color: transparent;
    border: 1px solid var(--primary-color);
    border-radius: 6px;
    width: 100%;
    color: var(--white);
  }
`;

const Search = ({ setSearchValue, placeholder = "Search...", ...props }) => {
  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <StyledSearch {...props}>
      <input type="text" placeholder={placeholder} onChange={onChangeSearch} />
    </StyledSearch>
  );
};

export default Search;
