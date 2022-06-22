import { configAPI } from "apis/configAPI";
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
      const { data } = await configAPI.movieDetail(id);
      setMovie(data.data.movie);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (loading) return "Loading";
  return <MovieViewDetail data={movie}></MovieViewDetail>;
};

export default MovieView;
