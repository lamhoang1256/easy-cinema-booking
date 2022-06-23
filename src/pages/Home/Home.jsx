import { useEffect, useState } from "react";
import { configAPI } from "apis/configAPI";
import { usePagination } from "hooks/usePagination";
import HomeComplexes from "module/home/HomeComplexes";
import HomeFeature from "module/home/HomeFeature";
import MovieList from "components/movie/MovieList";
import HomeBanner from "module/home/HomeBanner";

const Home = () => {
  const [movieList, setMovieList] = useState({ loading: true, data: [] });
  const [cinemaComplexes, setCinemaComplexes] = useState([]);
  const { pagination, handlePageChange, setPagination } = usePagination(1, 14);

  const fetchMovieList = async () => {
    setMovieList({ ...movieList, loading: true });
    try {
      const { data } = await configAPI.movieGetWithPagination(pagination);
      setPagination({ ...pagination, totalPages: data.data.pagination.totalPages });
      setMovieList({ data: data.data.movies, loading: false });
    } catch (err) {
      setMovieList({ ...movieList, loading: false });
      console.log(err);
    }
  };
  const fetchCinemaComplexes = async () => {
    try {
      const { data } = await configAPI.showtimeGetByComplexes();
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
            loading={movieList.loading}
            data={movieList.data}
            heading="Now showing"
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
