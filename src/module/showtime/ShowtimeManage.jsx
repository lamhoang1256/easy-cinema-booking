import { moviesApi } from "apis/moviesApi";
import { TextClamp } from "assets/styles/_mixin";
import ActionDelete from "components/action/ActionDelete";
import ActionUpdate from "components/action/ActionUpdate";
import ActionView from "components/action/ActionView";
import Button from "components/button/Button";
import ImageResize from "components/image/ImageResize";
import Pagination from "components/pagination/Pagination";
import Table from "components/table/Table";
import { usePagination } from "hooks/usePagination";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { formatISOtoLocaleDateString } from "utilities/formatDate";
import { sortArrayDescending } from "utilities/helper";

const StyledShowtimeManage = styled.div`
  .poster {
    width: 100px;
    overflow: hidden;
    border-radius: 8px;
  }

  .movie-name {
    width: 200px;
    ${TextClamp.multilines(2)}
  }
`;

const ShowtimeManage = () => {
  const [loading, setLoading] = useState(true);
  const [showtimes, setShowtimes] = useState([]);
  const { pagination, handlePageChange, setPagination } = usePagination();

  const fetchShowtimes = async () => {
    setLoading(true);
    try {
      const { data } = await moviesApi.showtimeGetWithPagination(pagination);
      setShowtimes(sortArrayDescending(data.data.showtimes, "id"));
      setPagination({ ...pagination, totalPages: data.data.pagination.totalPages });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleDeleteShowtime = async (id) => {
    try {
      const { data } = await moviesApi.showtimeDelete(id);
      if (data?.status === "success") toast.success("Delete showtime successfully");
      fetchShowtimes();
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    fetchShowtimes();
  }, [pagination.page]);

  if (loading) return "Loading";
  return (
    <StyledShowtimeManage>
      <Button to="/admin/showtime-manage/add">Add new showtime</Button>
      <Table>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Poster</th>
            <th>Rating</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Id Cinema</th>
            <th>Actions</th>
          </tr>
          {showtimes.map((showtime) => (
            <tr key={showtime.id}>
              <td>{showtime.id}</td>
              <td>
                <p className="movie-name">{showtime.movie.name}</p>
              </td>
              <td>
                <ImageResize
                  className="poster"
                  url={showtime.movie.poster}
                  width="100"
                  alt="poster"
                />
              </td>
              <td>{showtime.movie.rating}</td>
              <td>{moment(showtime?.startTime).format("lll")}</td>
              <td>{moment(showtime?.endTime).format("lll")}</td>
              <td>{showtime.screenId}</td>
              <td>
                <ActionUpdate to={`/admin/showtime-manage/update/${showtime.id}`}></ActionUpdate>
                <ActionView to={`/admin/showtime-manage/view/${showtime.id}`}></ActionView>
                <ActionDelete onClick={() => handleDeleteShowtime(showtime.id)}></ActionDelete>
              </td>
            </tr>
          ))}
        </table>
      </Table>
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </StyledShowtimeManage>
  );
};

export default ShowtimeManage;
