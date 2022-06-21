import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { moviesApi } from "apis/moviesApi";
import { usePagination } from "hooks/usePagination";
import Table from "components/table/Table";
import ActionView from "components/action/ActionView";
import Pagination from "components/pagination/Pagination";

const StyledCinemaManage = styled.div``;

const CinemaManage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [cinemaList, setCinemaList] = useState([]);
  const { pagination, handlePageChange, setPagination } = usePagination();

  const fetchCinemaList = async () => {
    setLoading(true);
    try {
      const { data } = await moviesApi.cinemaComplexesGetSingle(id);
      const { name } = data.data.cinemaComplex;
      const res2 = await moviesApi.cinemaGetWithPagination({ ...pagination, name });
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
                  <ActionView to={`/admin/cinema-manage/information/${cinema.id}`}></ActionView>
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
