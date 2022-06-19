import { moviesApi } from "apis/moviesApi";
import axios from "axios";
import ActionDelete from "components/action/ActionDelete";
import ActionUpdate from "components/action/ActionUpdate";
import ActionView from "components/action/ActionView";
import Table from "components/table/Table";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createKeyForObj } from "utilities/createKeyForObject";
import styled from "styled-components";
import { TextClamp } from "assets/styles/_mixin";
import ImageResize from "components/image/ImageResize";

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
  const [movieList, setMovieList] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieList = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("https://roxy-cinema-api.herokuapp.com/api/movies/all");
      const movieListHasKey = createKeyForObj(data.data.movies);
      setMovieList(movieListHasKey);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieList();
  }, []);

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
            const response = await moviesApi.movieDelete(idMovie);
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

  if (loading) return <div>Loading</div>;

  return (
    <StyledMovieManage>
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
                  <a href={movie.trailer}>Open Trailer</a>
                </td>
                <td>
                  <span className="releaseDate">{movie.releaseDate}</span>
                </td>
                <td>
                  <ActionUpdate to={`/admin/movie-manage/edit-film/${movie.id}`}></ActionUpdate>
                  <ActionDelete onClick={() => handleDeleteMovie(movie.id)}></ActionDelete>
                  <ActionView to={`/admin/movie-manage/schedule/${movie.id}`}></ActionView>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>
    </StyledMovieManage>
  );
};

export default MovieManage;