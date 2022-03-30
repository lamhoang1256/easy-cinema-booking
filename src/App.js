import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdminLayout } from "./layouts/AdminLayout/AdminLayout";
import { AuthLayout } from "./layouts/AuthLayout/AuthLayout";
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import { HomePage } from "./pages/HomePage/HomePage";
import { MovieDetail } from "./pages/MovieDetail/MovieDetail";
import { UserInfo } from "./pages/UserInfo/UserInfo";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "antd/dist/antd.css";
import "./sass/app.scss";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Layout */}
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/detail' element={<MovieDetail />} />
          <Route path='/user' element={<UserInfo />} />
        </Route>
        {/* Admin Layout */}
        <Route path='/admin' element={<AdminLayout />}></Route>
        {/* Auth Layout */}
        <Route path='/auth' element={<AuthLayout />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
