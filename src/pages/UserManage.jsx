import { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "components/table/Table";
import { usersApi } from "apis/usersApi";
import Button from "components/button/Button";

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
            <th>Action</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.dateOfBirth}</td>
              <td>{user.role}</td>
              <td>
                <Button to={`/admin/update-user/${user.id}`}>Update</Button>
              </td>
            </tr>
          ))}
        </table>
      </Table>
    </StyledUserManage>
  );
};

export default UserManage;
