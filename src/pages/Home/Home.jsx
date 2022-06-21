import { useEffect, useState } from "react";
import { moviesApi } from "apis/moviesApi";
import { showtimesApi } from "apis/showtimesApi";
import { usePagination } from "hooks/usePagination";
import HomeBanner from "module/home/HomeBanner";
import MovieList from "components/movie/MovieList";
import HomeComplexes from "module/home/HomeComplexes";
import HomeFeature from "module/home/HomeFeature";

const MOVIES_PER_PAGE = 14;
const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [cinemaComplexes, setCinemaComplexes] = useState([]);
  const { pagination, handlePageChange, setPagination } = usePagination(1, MOVIES_PER_PAGE);

  const fetchMovieList = async () => {
    try {
      const { data } = await moviesApi.movieGetWithPagination(pagination);
      setPagination({ ...pagination, totalPages: data.data.pagination.totalPages });
      setMovieList(data.data.movies);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCinemaComplexes = async () => {
    try {
      const { data } = await showtimesApi.showtimeGetByComplexes();
      setCinemaComplexes(data.data.cinemaComplexes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovieList();
  }, [pagination.page]);
  useEffect(() => {
    fetchCinemaComplexes();
  }, []);

  return (
    <div className="home">
      <div className="home-top">
        <HomeBanner />
      </div>
      <div className="home-main">
        <div className="container">
          <MovieList
            data={movieList}
            heading="Phim sắp chiếu"
            pagination={pagination}
            handlePageChange={handlePageChange}
          />
          <HomeComplexes cinemaComplexes={cinemaComplexes} />
          <HomeFeature />
        </div>
      </div>
    </div>
  );
};

export default Home;
