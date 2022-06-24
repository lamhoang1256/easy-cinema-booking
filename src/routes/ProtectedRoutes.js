import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "constants/path";

const ProtectedRoutes = ({ children, isAllowed }) => {
  const { currentUser } = useSelector((state) => state.authentication);
  if (!currentUser) {
    return <Navigate to={path.signIn} replace />;
  }
  if (!isAllowed.includes(currentUser.role)) {
    return <Navigate to={path.notFound} replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoutes;
