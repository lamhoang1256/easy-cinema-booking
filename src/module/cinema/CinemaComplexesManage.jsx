import { useState } from "react";
import { moviesApi } from "apis/moviesApi";
import React, { useEffect } from "react";
import Button from "components/button/Button";
import Table from "components/table/Table";
import styled from "styled-components";

const StyledCinemaManageComplexes = styled.div`
  .cinema-logo {
    width: 40px;
    height: 40px;
    border-radius: 100rem;
    overflow: hidden;
  }
`;

// createdAt: "2022-06-16T02:44:42.000Z"
// id: 34
// logo: "public/default/images/cinemaComplexes/lotte-cinema.png"
// name: "Lotte Cinema"
// updatedAt: "2022-06-16T02:44:42.000Z"
const CinemaManageComplexes = () => {
  const [cinemaComplexes, setCinemaComplexes] = useState([]);
  const fetchCinemaComplexes = async () => {
    try {
      const { data } = await moviesApi.cinemaComplexesGet();
      setCinemaComplexes(data.data.cinemaComplexes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCinemaComplexes();
  }, []);

  return (
    <StyledCinemaManageComplexes>
      <Table>
        <table>
          <tr>
            <th>ID</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
          {cinemaComplexes.map((cinema) => (
            <tr key={cinema.id}>
              <td>{cinema.id}</td>
              <td>
                <img
                  src={cinema.logo.split("public/default")[1]}
                  className="cinema-logo"
                  alt="logo"
                />
              </td>
              <td>{cinema.name}</td>
              <td>
                <Button to={`/admin/cinema-manage/${cinema.id}`}>Update</Button>
              </td>
            </tr>
          ))}
        </table>
      </Table>
    </StyledCinemaManageComplexes>
  );
};

export default CinemaManageComplexes;
