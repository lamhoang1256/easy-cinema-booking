import { useState } from "react";
import { moviesApi } from "apis/moviesApi";
import React, { useEffect } from "react";
import Table from "components/table/Table";
import styled from "styled-components";
import ActionView from "components/action/ActionView";

const StyledCinemaManageComplexes = styled.div`
  .cinema-logo {
    width: 40px;
    height: 40px;
    border-radius: 100rem;
    overflow: hidden;
  }
`;

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
          <thead>
            <tr>
              <th>ID</th>
              <th>Logo</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
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
                  <ActionView to={`/admin/cinema-manage/${cinema.id}`}>Update</ActionView>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>
    </StyledCinemaManageComplexes>
  );
};

export default CinemaManageComplexes;

// "logo": "public/default/images/cinemaComplexes/cgv.jpeg",
// "id": 4,
// "name": "CGV",
// "createdAt": "2022-06-16T02:44:42.000Z",
// "updatedAt": "2022-06-16T02:44:42.000Z"
