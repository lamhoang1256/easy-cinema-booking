import { Link } from "react-router-dom";
import "./errorPage.scss";

const ErrorPage = ({ code, heading, children }) => {
  return (
    <div className='error-page'>
      <div className='error-page-container'>
        <div className='error-page-gradient'>{code}</div>
        <h2 className='error-page-heading'>{heading}</h2>
        <div className='error-page-desc'>{children}</div>
        <Link to='/'>
          <button className='btn btn--primary'>Quay lại trang chủ</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
