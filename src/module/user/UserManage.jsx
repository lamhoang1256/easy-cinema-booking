import { useEffect, useState } from "react";
import styled from "styled-components";
import { path } from "constants/path";
import { useDebounce } from "hooks/useDebounce";
import { usePagination } from "hooks/usePagination";
import { configAPI } from "apis/configAPI";
import Button from "components/button/Button";
import Search from "components/input/Search";
import LoadingSpinner from "components/loading/LoadingSpinner";
import Pagination from "components/pagination/Pagination";
import Table from "components/table/Table";
import ActionUpdate from "components/action/ActionUpdate";

const StyledUserManage = styled.div``;

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { pagination, handlePageChange, setPagination } = usePagination();
  const [searchValue, setSearchValue] = useState("");
  const searchDebounce = useDebounce(searchValue);

  const fetchAllUser = async () => {
    setLoading(true);
    try {
      const { data } = await configAPI.userGetWithPagination({
        ...pagination,
        email: searchDebounce,
      });
      setUsers(data.data.users);
      setPagination({ ...pagination, totalPages: data.data.pagination.totalPages });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllUser();
  }, [pagination.page, searchDebounce]);

  return (
    <StyledUserManage>
      <div className="manage-header">
        <Search
          className="search"
          value={searchValue}
          setSearchValue={setSearchValue}
          placeholder="Search Email..."
        />
        <Button kind="purple" to={path.userAddNew}>
          Add New User
        </Button>
      </div>
      {loading && <LoadingSpinner />}
      {!loading && (
        <>
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
        </>
      )}
    </StyledUserManage>
  );
};

export default UserManage;
