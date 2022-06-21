import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailBanner from "module/detail/DetailBanner";
import DetailCasts from "module/detail/DetailCasts";
import DetailHeader from "module/detail/DetailHeader";
import DetailOverview from "module/detail/DetailOverview";
import DetailTrailer from "module/detail/DetailTrailer";
import HomeComplexes from "module/home/HomeComplexes";

const StyledMovieDetail = styled.div`
  .heading-sub {
    margin: 20px 0 10px;
  }
  .tag {
    color: rgb(150, 146, 199);
    font-size: 1.8rem;
    font-weight: 500;
  }
`;

const MovieDetail = () => {
  const { idDetail } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState();
  const [detailTmdb, setDetailTmdb] = useState();
  const [cinemaComplexes, setCinemaComplexes] = useState([]);

  const fetchMovieList = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://roxy-cinema-api.herokuapp.com/api/movies/" + idDetail
      );
      setDetail(data.data.movie);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const fetchMovieTMDB = async () => {
    try {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/movie/508947?api_key=95f2419536f533cdaa1dadf83c606027&language=en-US"
      );
      setDetailTmdb(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCinemaComplexes = async () => {
    try {
      const { data } = await axios.get(
        "https://roxy-cinema-api.herokuapp.com/api/movies/4/showtimes"
      );
      setCinemaComplexes(data.data.cinemaComplexes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovieList();
    fetchMovieTMDB();
    fetchCinemaComplexes();
  }, []);

  if (loading) return "Loading";
  return (
    <StyledMovieDetail>
      <DetailBanner banner={detailTmdb?.backdrop_path} fallback={detail?.poster} />
      <div className="container">
        <DetailHeader detail={detail} detailTmdb={detailTmdb} />
        <DetailOverview overview={detailTmdb?.overview} />
        <DetailCasts />
        <DetailTrailer myTrailer={detail?.trailer} />
        <HomeComplexes cinemaComplexes={cinemaComplexes} />
      </div>
    </StyledMovieDetail>
  );
};

export default MovieDetail;
