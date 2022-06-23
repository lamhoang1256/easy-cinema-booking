import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useSearchParams } from "react-router-dom";
import { configAPI } from "apis/configAPI";
import { tmdbAPI } from "apis/tmdbApi";
import DetailBanner from "module/detail/DetailBanner";
import DetailHeader from "module/detail/DetailHeader";
import DetailOverview from "module/detail/DetailOverview";
import DetailCasts from "module/detail/DetailCasts";
import DetailTrailer from "module/detail/DetailTrailer";
import HomeComplexes from "module/home/HomeComplexes";
import DetailMyTrailer from "module/detail/DetailMyTrailer";
import LoadingSpinner from "components/loading/LoadingSpinner";

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
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const tmdbId = searchParams.get("tmdbId");
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const [detailTmdb, setDetailTmdb] = useState([]);
  const [cinemaComplexes, setCinemaComplexes] = useState([]);

  const fetchMovieDetailTMDB = async () => {
    try {
      const { data } = await tmdbAPI.getMovieDetail(tmdbId);
      setDetailTmdb(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCinemaComplexes = async () => {
    try {
      const { data } = await configAPI.movieGetShowtime(id);
      setCinemaComplexes(data.data.cinemaComplexes);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchMovieDetail = async () => {
    setLoading(true);
    try {
      const { data } = await configAPI.movieGetDetail(id);
      setDetail(data.data.movie);
      await fetchMovieDetailTMDB();
      await fetchCinemaComplexes();
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovieDetail();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  const { poster, description, trailer } = detail;
  const { overview, backdrop_path } = detailTmdb;
  return (
    <StyledMovieDetail>
      <DetailBanner banner={backdrop_path} fallback={poster} />
      <div className="container">
        <DetailHeader detail={detail} detailTmdb={detailTmdb} />
        <DetailOverview description={description} overview={overview} />
        <DetailCasts />
        <DetailMyTrailer url={trailer} />
        <DetailTrailer />
        <HomeComplexes cinemaComplexes={cinemaComplexes} />
      </div>
    </StyledMovieDetail>
  );
};

export default MovieDetail;
