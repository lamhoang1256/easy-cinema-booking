import styled from "styled-components";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useDebounce } from "hooks/useDebounce";
import { usePagination } from "hooks/usePagination";
import { useEffect, useState } from "react";
import { path } from "constants/path";
import { configAPI } from "apis/configAPI";
import { TextClamp } from "assets/styles/mixin";
import Button from "components/button/Button";
import ImageResize from "components/image/ImageResize";
import SearchInput from "module/search/SearchInput";
import Pagination from "components/pagination/Pagination";
import Table from "components/table/Table";
import ActionDelete from "components/action/ActionDelete";
import ActionUpdate from "components/action/ActionUpdate";
import ActionView from "components/action/ActionView";
import LoadingSpinner from "components/loading/LoadingSpinner";

const StyledMovieManage = styled.div`
  .title {
    min-width: 140px;
    ${TextClamp.multilines(2)}
  }
  .desc {
    ${TextClamp.multilines(3)}
  }
  .media .lazy-load-image-background {
    width: 100px;
  }
  .poster {
    width: 100px;
    border-radius: 8px;
  }
  .releaseDate {
    min-width: 100px;
    display: inline-block;
  }
`;

const MovieManage = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { pagination, handlePageChange, setPagination } = usePagination();
  const [searchValue, setSearchValue] = useState("");
  const searchDebounce = useDebounce(searchValue);

  const fetchMovieList = async () => {
    setLoading(true);
    try {
      const { data } = await configAPI.movieGetWithPagination({
        ...pagination,
        name: searchDebounce,
      });
      setMovieList(data.data.movies);
      setPagination({ ...pagination, totalPages: data.data.pagination.totalPages });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieList();
  }, [pagination.page, searchDebounce]);

  const handleDeleteMovie = (idMovie) => {
    Swal.fire({
      title: "Delete movie?",
      text: "Are you sure you want to delete this movie?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteMovie = async (idMovie) => {
          try {
            const { data } = await configAPI.movieDelete(idMovie);
            if (data?.status === "success") {
              toast.success("Movie delected successfully");
              fetchMovieList();
            }
          } catch (error) {
            toast.error(error?.response?.data?.message);
          }
        };
        deleteMovie(idMovie);
      }
    });
  };

  return (
    <StyledMovieManage>
      <div className="manage-header">
        <SearchInput
          className="search"
          value={searchValue}
          setSearchValue={setSearchValue}
          placeholder="Search Movie..."
        />
        <Button className="addNew" kind="purple" to={path.movieAddNew}>
          Add new movie
        </Button>
      </div>
      {loading && <LoadingSpinner />}
      {!loading &&
        (movieList.length > 0 ? (
          <>
            <Table>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Poster</th>
                    <th>Description</th>
                    <th>Rating</th>
                    <th>Trailer</th>
                    <th>Release Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {movieList.map((movie) => (
                    <tr key={movie.id}>
                      <td>{movie.id}</td>
                      <td>
                        <p className="title">{movie.name}</p>
                      </td>
                      <td className="media">
                        <ImageResize
                          className="poster"
                          url={movie.poster}
                          width="100"
                          alt="poster"
                        />
                      </td>
                      <td>
                        <p className="desc">{movie.description}</p>
                      </td>
                      <td>{movie.rating}</td>
                      <td>
                        <a href={movie.trailer} target="_blank">
                          Trailer
                        </a>
                      </td>
                      <td>
                        <span className="releaseDate">{movie.releaseDate}</span>
                      </td>
                      <td>
                        <ActionUpdate to={`${path.movieUpdate}/${movie.id}`}></ActionUpdate>
                        <ActionDelete onClick={() => handleDeleteMovie(movie.id)}></ActionDelete>
                        <ActionView to={`${path.movieView}/${movie.id}`}></ActionView>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Table>
            <Pagination pagination={pagination} onPageChange={handlePageChange} />
          </>
        ) : (
          <h3>No movie found</h3>
        ))}
    </StyledMovieManage>
  );
};

export default MovieManage;
