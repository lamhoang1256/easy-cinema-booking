import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLayout from "layouts/AdminLayout";
import AuthLayout from "layouts/AuthLayout";
import MainLayout from "layouts/MainLayout";
import Home from "pages/Home";
import Login from "pages/Login";
import Profile from "pages/Profile";
import MovieDetail from "pages/MovieDetail";
import NewsDetail from "pages/NewsDetail";
import TicketRoom from "pages/TicketRoom";
import Register from "pages/Register";
import NotFound from "pages/NotFound";
import UserManage from "pages/UserManage";
import MovieManage from "pages/MovieManage";
import CinemaManage from "pages/CinemaManage";
import MainManage from "pages/MainManage";
import EditFilm from "module/MovieManage/EditFilm";
import AddFilm from "module/MovieManage/AddFilm";
import CinemaGroup from "module/CinemaManage/CinemaGroup";
import ScheduleFilm from "module/MovieManage/ScheduleFilm";
import SeatMap from "module/MovieManage/SeatMap";

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
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
