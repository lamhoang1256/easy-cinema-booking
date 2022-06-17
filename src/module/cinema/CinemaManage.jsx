import { moviesApi } from "apis/moviesApi";
import Button from "components/button/Button";
import Table from "components/table/Table";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const StyledCinemaManage = styled.div``;

const CinemaManage = () => {
  const { id } = useParams();
  const [cinemaList, setCinemaList] = useState([]);
  const fetchCinemaComplexe = async () => {
    try {
      const { data } = await moviesApi.cinemaComplexesGetSingle(id);
      const { name } = data.data.cinemaComplex;
      const response2 = await moviesApi.cinemasGetAll({ name });
      console.log(response2.data.data);
      setCinemaList(response2.data.data.cinemas);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCinemaComplexe();
  }, [id]);

  return (
    <StyledCinemaManage>
      <Table>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cinemaList.map((cinema) => (
              <tr key={cinema.id}>
                <td>{cinema.id}</td>
                <td>{cinema.name}</td>
                <td>{cinema.address}</td>
                <td>{cinema.rating}</td>
                <td>
                  <Button to={`/admin/cinema-manage/${cinema.id}`}>Update</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>
    </StyledCinemaManage>
  );
};

export default CinemaManage;
