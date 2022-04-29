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
import { UserManagement } from "pages/UserManagement/UserManagement";
import MovieManagement from "pages/MovieManagement/MovieManagement";
import EditFilm from "pages/MovieManagement/components/EditFilm/EditFilm";
import AddFilm from "pages/MovieManagement/components/AddFilm/AddFilm";
import CinemaList from "pages/MovieManagement/components/CinemaList/CinemaList";
import CinemaGroup from "pages/MovieManagement/components/CinemaGroup/CinemaGroup";

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
          <Route path='user-management' element={<UserManagement />} />
          <Route path='movie-management' element={<MovieManagement />} />
          <Route path='edit-film/:idMovieEdit' element={<EditFilm />} />
          <Route path='add-film' element={<AddFilm />} />
          <Route path='list-cinema' element={<CinemaList />} />
          <Route path='cinema-group/:cinemaSystem/:cinemaName' element={<CinemaGroup />} />
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
