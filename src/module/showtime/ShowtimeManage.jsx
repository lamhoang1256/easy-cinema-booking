import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { configAPI } from "apis/configAPI";
import { TextClamp } from "assets/styles/mixin";
import { path } from "constants/path";
import { usePagination } from "hooks/usePagination";
import ActionDelete from "components/action/ActionDelete";
import ActionUpdate from "components/action/ActionUpdate";
import ActionView from "components/action/ActionView";
import Button from "components/button/Button";
import ImageResize from "components/image/ImageResize";
import LoadingSpinner from "components/loading/LoadingSpinner";
import Pagination from "components/pagination/Pagination";
import Table from "components/table/Table";

const StyledShowtimeManage = styled.div`
  .poster {
    width: 100px;
    overflow: hidden;
    border-radius: 8px;
  }
  .addNew {
    margin-bottom: 20px;
    margin-left: auto;
  }
  .movie-name {
    width: 200px;
    ${TextClamp.multilines(2)}
  }
`;

const ShowtimeManage = () => {
  const [loading, setLoading] = useState(true);
  const [showtimes, setShowtimes] = useState([]);
  console.log("showtimes: ", showtimes);
  const { pagination, handlePageChange, setPagination } = usePagination();

  const fetchShowtimes = async () => {
    setLoading(true);
    try {
      const { data } = await configAPI.showtimeGetWithPagination(pagination);
      setShowtimes(data.data.showtimes);
      setPagination({ ...pagination, totalPages: data.data.pagination.totalPages });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleDeleteShowtime = async (id) => {
    try {
      const { data } = await configAPI.showtimeDelete(id);
      if (data?.status === "success") toast.success("Showtime deleted successfully");
      fetchShowtimes();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchShowtimes();
  }, [pagination.page]);

  return (
    <StyledShowtimeManage>
      <Button className="addNew" kind="purple" to={path.showtimeAddNew}>
        Add new showtime
      </Button>
      {loading && <LoadingSpinner />}
      {!loading &&
        (showtimes.length > 0 ? (
          <>
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
                    <td>{showtime?.screen?.name}</td>
                    <td>
                      <ActionUpdate to={`${path.showtimeUpdate}/${showtime.id}`} />
                      <ActionView to={`${path.showtimeView}/${showtime.id}`} />
                      <ActionDelete onClick={() => handleDeleteShowtime(showtime.id)} />
                    </td>
                  </tr>
                ))}
              </table>
            </Table>
            <Pagination pagination={pagination} onPageChange={handlePageChange} />
          </>
        ) : (
          <h3>No showtime found</h3>
        ))}
    </StyledShowtimeManage>
  );
};

export default ShowtimeManage;
