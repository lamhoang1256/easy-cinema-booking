import { configAPI } from "apis/configAPI";
import ActionUpdate from "components/action/ActionUpdate";
import Pagination from "components/pagination/Pagination";
import Table from "components/table/Table";
import { path } from "constants/path";
import { usePagination } from "hooks/usePagination";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { sortArrayDescending } from "utilities/helper";

const StyledUserManage = styled.div``;

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { pagination, handlePageChange, setPagination } = usePagination();
  const fetchAllUser = async () => {
    setLoading(true);
    try {
      const { data } = await configAPI.userGetWithPagination(pagination);
      setUsers(data.data.users);
      setPagination({ ...pagination, totalPages: data.data.pagination.totalPages });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllUser();
  }, [pagination.page]);

  if (loading) return "Loading";
  return (
    <StyledUserManage>
      <Table>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Fullname</th>
              <th>Phone</th>
              <th>Date Of Birth</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.role}</td>
                <td>
                  <ActionUpdate to={`${path.userUpdate}/${user.id}`}>Update</ActionUpdate>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </StyledUserManage>
  );
};

export default UserManage;
