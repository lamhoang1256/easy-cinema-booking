import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { configAPI } from "apis/configAPI";
import LoadingSpinner from "components/loading/LoadingSpinner";

const StyledCinemaView = styled.div`
  line-height: 2;
`;

const CinemaView = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [information, setInformation] = useState(null);
  const fetchCinemaView = async () => {
    setLoading(true);
    try {
      const { data } = await configAPI.cinemaGetInformation(id);
      setInformation(data.data.cinema);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCinemaView();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  return (
    <StyledCinemaView>
      <h1>{information.name}</h1>
      <h3>Address: {information.address}</h3>
      <h3>Phone Number: {information.phoneNumber}</h3>
      <h3>Rating: {information.rating}</h3>
      <p>{information.description}</p>
    </StyledCinemaView>
  );
};

export default CinemaView;
