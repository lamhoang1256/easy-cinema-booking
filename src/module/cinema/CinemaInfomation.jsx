import { moviesApi } from "apis/moviesApi";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const StyledCinemaInformation = styled.div``;

const CinemaInformation = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [information, setInformation] = useState(null);
  const fetchCinemaInformation = async () => {
    setLoading(true);
    try {
      const { data } = await moviesApi.cinemaGetInformation(id);
      setInformation(data.data.cinema);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCinemaInformation();
  }, [id]);

  if (loading) return "Loading";
  return (
    <StyledCinemaInformation>
      <h1>{information.name}</h1>
      <h2>{information.address}</h2>
      <p>{information.description}</p>
      <p>{information.phoneNumber}</p>
      <p>{information.rating}</p>
    </StyledCinemaInformation>
  );
};

export default CinemaInformation;
