import { moviesApi } from "apis/moviesApi";
import Button from "components/button/Button";
import Table from "components/table/Table";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledShowtimeManage = styled.div`
  .poster {
    width: 100px;
    overflow: hidden;
  }
`;

const ShowtimeManage = () => {
  const [loading, setLoading] = useState(true);
  const [showtimes, setShowtimes] = useState([]);

  const handleDeleteShowtime = (id) => {
    try {
      moviesApi.showtimeDelete(id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCinemaComplexes = async () => {
    setLoading(true);
    try {
      const { data } = await moviesApi.showtimeGetAll();
      setShowtimes(data.data.showtimes);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCinemaComplexes();
  }, []);

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
            <th>Status</th>
            <th>Release Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Id Cinema</th>
            <th>Actions</th>
          </tr>
          {showtimes.map((showtime) => (
            <tr key={showtime.id}>
              <td>{showtime.id}</td>
              <td>{showtime.movie.name}</td>
              <td>
                <img src={showtime.movie.poster} className="poster" alt="poster" />
              </td>
              <td>{showtime.movie.rating}</td>
              <td>{showtime.movie.status}</td>
              <td>{showtime.movie.releaseDate}</td>
              <td>{showtime.startTime}</td>
              <td>{showtime.endTime}</td>
              <td>{showtime.screenId}</td>
              <td>
                <Button to={`/admin/showtime-manage/update/${showtime.id}`}>Update</Button>
                <Button to={`/admin/showtime-manage/view/${showtime.id}`}>View</Button>
                <Button onClick={() => handleDeleteShowtime(showtime.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </table>
      </Table>
    </StyledShowtimeManage>
  );
};

export default ShowtimeManage;
