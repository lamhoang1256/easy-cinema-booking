import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLayout from "layouts/AdminLayout/AdminLayout";
import AuthLayout from "layouts/AuthLayout/AuthLayout";
import MainLayout from "layouts/MainLayout/MainLayout";
import Home from "pages/Public/Home";
import MovieDetail from "pages/Public/MovieDetail";
import Profile from "pages/Public/Profile";
import NewsDetail from "pages/Public/NewsDetail/NewsDetail";
import TicketRoom from "pages/Public/TicketRoom";
import Register from "pages/Public/Register/Register";
import PageNotFound from "pages/Public/PageNotFound/PageNotFound";
import Login from "pages/Public/Login/Login";
import UserManage from "pages/Admin/UserManage/UserManage";
import MovieManage from "pages/Admin/MovieManage/MovieManage";
import EditFilm from "pages/Admin/MovieManage/components/EditFilm/EditFilm";
import AddFilm from "pages/Admin/MovieManage/components/AddFilm/AddFilm";
import CinemaManage from "pages/Admin/CinemaManage/CinemaManage";
import CinemaGroup from "pages/Admin/CinemaManage/components/CinemaGroup/CinemaGroup";
import MainManage from "pages/Admin/MainManage";
import ScheduleFilm from "pages/Admin/MovieManage/components/ScheduleFilm/ScheduleFilm";
import SeatMap from "pages/Admin/MovieManage/components/SeatMap/SeatMap";

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        {/* Main Layout */}
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/detail/:idDetail' element={<MovieDetail />} />
          <Route path='/user' element={<Profile />} />
          <Route path='/news/:idNewsDetail' element={<NewsDetail />} />
          <Route path='/booking/:idTicketRoom' element={<TicketRoom />} />
        </Route>
        {/* Admin Layout */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<MainManage />} />
          <Route path='user-manage' element={<UserManage />} />
          <Route path='movie-manage'>
            <Route index element={<MovieManage />} />
            <Route path='edit-film/:idMovieEdit' element={<EditFilm />} />
            <Route path='add-film' element={<AddFilm />} />
            <Route path='seat-map/:idTicketRoom' element={<SeatMap />} />
            <Route path='schedule/:idSchedule' element={<ScheduleFilm />} />
          </Route>
          <Route path='cinema-manage'>
            <Route index element={<CinemaManage />} />
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
};

export default RoutesComponent;
