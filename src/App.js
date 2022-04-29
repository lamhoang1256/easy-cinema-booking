import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdminLayout } from "./layouts/AdminLayout/AdminLayout";
import { AuthLayout } from "./layouts/AuthLayout/AuthLayout";
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import { Home } from "./pages/Home/Home";
import { MovieDetail } from "./pages/MovieDetail/MovieDetail";
import { UserInfo } from "./pages/UserInfo/UserInfo";
import { NewsDetail } from "./pages/NewsDetail/NewsDetail";
import { MovieTicketRoom } from "./pages/MovieTicketRoom/MovieTicketRoom";
import { Login } from "./pages/Login/Login";
import { Register } from "pages/Register/Register";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
// style css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-loading-skeleton/dist/skeleton.css";
import "antd/dist/antd.css";
import "./assets/scss/app.scss";
import UserManage from "pages/UserManage/UserManage";
import MovieManage from "pages/MovieManage/MovieManage";
import EditFilm from "pages/MovieManage/components/EditFilm/EditFilm";
import AddFilm from "pages/MovieManage/components/AddFilm/AddFilm";
import CinemaList from "pages/MovieManage/components/CinemaList/CinemaList";
import CinemaGroup from "pages/MovieManage/components/CinemaGroup/CinemaGroup";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Layout */}
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/detail/:idDetail' element={<MovieDetail />} />
          <Route path='/user' element={<UserInfo />} />
          <Route path='/news/:idNewsDetail' element={<NewsDetail />} />
          <Route path='/booking/:idTicketRoom' element={<MovieTicketRoom />} />
        </Route>
        {/* Admin Layout */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='user-manage' element={<UserManage />} />
          <Route path='movie-manage'>
            <Route index element={<MovieManage />} />
            <Route path='edit-film/:idMovieEdit' element={<EditFilm />} />
            <Route path='add-film' element={<AddFilm />} />
          </Route>

          <Route path='cinema-manage'>
            <Route index element={<CinemaList />} />
            <Route path=':cinemaSystem/:cinemaName' element={<CinemaGroup />} />
          </Route>
        </Route>
        {/* Auth Layout */}
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        {/* Not Found 404 */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
