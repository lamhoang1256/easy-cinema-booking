import { moviesApi } from "apis/moviesApi";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const StyledShowtimeView = styled.div``;

const ShowtimeView = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [showtime, setShowtime] = useState(null);

  const fetchShowtimeNeedUpdate = async () => {
    setLoading(true);
    try {
      const { data } = await moviesApi.showtimeGetSingle(id);
      setShowtime(data.data.showtime);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShowtimeNeedUpdate();
  }, [id]);

  if (loading) return "Loading";
  return (
    <StyledShowtimeView>
      <h2>{showtime.movie.name}</h2>
      <img src={showtime.movie.poster} alt="" />
      {JSON.stringify(showtime)}
    </StyledShowtimeView>
  );
};

export default ShowtimeView;
