import { useState } from "react";
import { configAPI } from "apis/configAPI";
import React, { useEffect } from "react";
import Table from "components/table/Table";
import styled from "styled-components";
import ActionView from "components/action/ActionView";
import { path } from "constants/path";
import LoadingSpinner from "components/loading/LoadingSpinner";

const StyledComplexesManage = styled.div`
  .cinema-logo {
    width: 40px;
    height: 40px;
    border-radius: 100rem;
    overflow: hidden;
  }
`;

const ComplexesManage = () => {
  const [cinemaComplexes, setComplexes] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchComplexes = async () => {
    setLoading(true);
    try {
      const { data } = await configAPI.cinemaComplexesGet();
      setComplexes(data.data.cinemaComplexes);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchComplexes();
  }, []);

  if (loading) return <LoadingSpinner />;
  return (
    <StyledComplexesManage>
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
                  <img src={cinema.logo} className="cinema-logo" alt="logo" />
                </td>
                <td>{cinema.name}</td>
                <td>
                  <ActionView to={`${path.cinemaManage}/${cinema.id}`}></ActionView>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>
    </StyledComplexesManage>
  );
};

export default ComplexesManage;
