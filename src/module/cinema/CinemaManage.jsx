import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { configAPI } from "apis/configAPI";
import { usePagination } from "hooks/usePagination";
import Table from "components/table/Table";
import ActionView from "components/action/ActionView";
import Pagination from "components/pagination/Pagination";
import { path } from "constants/path";

const StyledCinemaManage = styled.div``;

const CinemaManage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [cinemaList, setCinemaList] = useState([]);
  const { pagination, handlePageChange, setPagination } = usePagination();

  const fetchCinemaList = async () => {
    setLoading(true);
    try {
      const { data } = await configAPI.cinemaComplexesGetSingle(id);
      const { name } = data.data.cinemaComplex;
      const res2 = await configAPI.cinemaGetWithPagination({ ...pagination, name });
      setCinemaList(res2.data.data.cinemas);
      setPagination({ ...pagination, totalPages: res2.data.data.pagination.totalPages });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCinemaList();
  }, [pagination.page, id]);

  if (loading) return "Loading";
  if (cinemaList.length === 0) return <span>No cinema</span>;
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
                  <ActionView to={`${path.cinemaView}/${cinema.id}`}></ActionView>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </StyledCinemaManage>
  );
};

export default CinemaManage;
