import useSWR from "swr";
import styled from "styled-components";
import { useDebounce } from "hooks/useDebounce";
import { useEffect, useState } from "react";
import { fetcher, tmdbAPI } from "apis/tmdbApi";
import SearchInput from "module/search/SearchInput";
import { usePagination } from "hooks/usePagination";
import SearchList from "../../module/search/SearchList";
import { scrollTop } from "utilities/helper";

const StyledSearchMovie = styled.div``;

const SearchMovie = () => {
  const { pagination, handlePageChange, setPagination } = usePagination();
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", pagination.page));
  const filterDebounce = useDebounce(filter, 500);
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, pagination.page));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", pagination.page));
    }
  }, [filterDebounce, pagination.page]);
  const movies = data?.results || [];
  useEffect(() => {
    if (!data || !data.total_results) return;
    setPagination({
      ...pagination,
      page: data.page,
      totalPages: data.total_pages,
    });
    scrollTop();
  }, [data]);

  return (
    <StyledSearchMovie>
      <div className="container">
        <SearchInput height="54px" placeholder="Search Movie..." setSearchValue={setFilter} />
        <SearchList
          data={movies}
          loading={loading}
          pagination={pagination}
          handlePageChange={handlePageChange}
        />
      </div>
    </StyledSearchMovie>
  );
};

export default SearchMovie;
