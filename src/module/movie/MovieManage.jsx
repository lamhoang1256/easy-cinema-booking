import styled from "styled-components";
import Swal from "sweetalert2";
import { useDebounce } from "hooks/useDebounce";
import { usePagination } from "hooks/usePagination";
import { useEffect, useState } from "react";
import { path } from "constants/path";
import { configAPI } from "apis/configAPI";
import { TextClamp } from "assets/styles/mixin";
import Button from "components/button/Button";
import ImageResize from "components/image/ImageResize";
import Search from "components/input/Search";
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
      title: "Xóa phim?",
      text: "Bạn có chắc chắc muốn xóa phim này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteMovie = async (idMovie) => {
          try {
            const response = await configAPI.movieDelete(idMovie);
            if (response) {
              Swal.fire("Xóa thành công!", "Phim bạn chọn đã được xóa.", "success");
              fetchMovieList();
            }
          } catch (error) {
            Swal.fire("Xóa thất bại!", error?.response?.data?.content, "error");
          }
        };
        deleteMovie(idMovie);
      }
    });
  };

  return (
    <StyledMovieManage>
      <div className="manage-header">
        <Search
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
      {!loading && (
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
                    <td>
                      <ImageResize className="poster" url={movie.poster} width="100" alt="poster" />
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
      )}
    </StyledMovieManage>
  );
};

export default MovieManage;
