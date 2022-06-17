import { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "components/table/Table";
import { usersApi } from "apis/usersApi";

const StyledUserManage = styled.div``;

const UserManage = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUser = async () => {
    try {
      const { data } = await usersApi.userGetAll();
      setUsers(data.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <StyledUserManage>
      <Table>
        <table>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Fullname</th>
            <th>Phone</th>
            <th>Date Of Birth</th>
            <th>Role</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.dateOfBirth}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </table>
      </Table>
    </StyledUserManage>
  );
};

export default UserManage;

// createdAt: "2022-06-16T02:44:41.000Z"
// dateOfBirth: null
// email: "user@example.com"
// firstName: "Normal"
// id: 14
// lastName: "User"
// phoneNumber: null
// role: "user"
// updatedAt: "2022-06-16T02:44:41.000Z"
