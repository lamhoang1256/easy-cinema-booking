import { tmdbAPI } from "apis/tmdbApi";
import LoadingSpinner from "components/loading/LoadingSpinner";
import DetailBanner from "module/detail/DetailBanner";
import DetailCasts from "module/detail/DetailCasts";
import DetailHeader from "module/detail/DetailHeader";
import DetailOverview from "module/detail/DetailOverview";
import DetailTrailer from "module/detail/DetailTrailer";
import HomeComplexes from "module/home/HomeComplexes";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { scrollTop } from "utils/helper";

const StyledMovieDetailTmdb = styled.section``;

const MovieDetailTmdb = () => {
  const [searchParams] = useSearchParams();
  const tmdbId = searchParams.get("tmdbId");
  const [loading, setLoading] = useState(true);
  const [detailTmdb, setDetailTmdb] = useState([]);

  const fetchMovieDetailTMDB = async () => {
    setLoading(true);
    try {
      const { data } = await tmdbAPI.getMovieDetail(tmdbId);
      setDetailTmdb(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchMovieDetailTMDB();
    scrollTop();
  }, [tmdbId]);

  if (loading) return <LoadingSpinner />;
  const { overview, backdrop_path } = detailTmdb;
  return (
    <StyledMovieDetailTmdb>
      <DetailBanner banner={backdrop_path} />
      <div className="container">
        <DetailHeader detailTmdb={detailTmdb} />
        <DetailOverview overview={overview} />
        <DetailCasts />
        <DetailTrailer />
        <HomeComplexes cinemaComplexes={[]} />
      </div>
    </StyledMovieDetailTmdb>
  );
};

export default MovieDetailTmdb;
