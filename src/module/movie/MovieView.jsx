import { configAPI } from "apis/configAPI";
import LoadingSpinner from "components/loading/LoadingSpinner";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieViewDetail from "./MovieViewDetail";

const MovieView = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);

  const fetchMovie = async () => {
    setLoading(true);
    try {
      const { data } = await configAPI.movieGetDetail(id);
      setMovie(data.data.movie);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  return <MovieViewDetail data={movie}></MovieViewDetail>;
};

export default MovieView;
