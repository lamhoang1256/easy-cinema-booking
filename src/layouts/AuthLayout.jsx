import { Link, Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className='auth-layout'>
      <Outlet />
      <Link to='/' className='auth-backhome'>
        <ion-icon name='home'></ion-icon>
      </Link>
    </div>
  );
};

export default AuthLayout;
