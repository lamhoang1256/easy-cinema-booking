import axios from "axios";
import MovieList from "components/movie/MovieList";
import HomeBanner from "module/home/HomeBanner";
import HomeFeature from "module/home/HomeFeature";
import HomeComplexes from "module/home/HomeComplexes";
import { useEffect, useState } from "react";

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [cinemaComplexes, setCinemaComplexes] = useState([]);

  const fetchMovieList = async () => {
    try {
      const { data } = await axios.get("https://roxy-cinema-api.herokuapp.com/api/movies/all");
      setMovieList(data.data.movies);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCinemaComplexes = async () => {
    try {
      const { data } = await axios.get(
        "https://roxy-cinema-api.herokuapp.com/api/cinema-complexes/showtimes"
      );
      setCinemaComplexes(data.data.cinemaComplexes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovieList();
    fetchCinemaComplexes();
  }, []);

  return (
    <div className="home">
      <div className="home-top">
        <HomeBanner />
      </div>
      <div className="home-main">
        <div className="container">
          <MovieList data={movieList} heading="Phim sắp chiếu" />
          <HomeComplexes cinemaComplexes={cinemaComplexes} />
          <HomeFeature />
        </div>
      </div>
    </div>
  );
};

export default Home;
