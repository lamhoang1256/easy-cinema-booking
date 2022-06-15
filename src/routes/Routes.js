import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const AdminLayout = React.lazy(() => import("layouts/AdminLayout"));
const MainLayout = React.lazy(() => import("layouts/MainLayout"));
const Home = React.lazy(() => import("pages/Home"));
const Profile = React.lazy(() => import("pages/Profile"));
const MovieDetail = React.lazy(() => import("pages/MovieDetail"));
const NewsDetail = React.lazy(() => import("pages/NewsDetail"));
const TicketRoom = React.lazy(() => import("pages/TicketRoom"));
const SignUp = React.lazy(() => import("pages/Authentication/SignUp"));
const SignIn = React.lazy(() => import("pages/Authentication/SignIn"));
const NotFound = React.lazy(() => import("pages/NotFound"));
const UserManage = React.lazy(() => import("pages/UserManage"));
const MovieManage = React.lazy(() => import("pages/MovieManage"));
const CinemaManage = React.lazy(() => import("pages/CinemaManage"));
const MainManage = React.lazy(() => import("pages/MainManage"));
const EditFilm = React.lazy(() => import("module/MovieManage/EditFilm"));
const AddFilm = React.lazy(() => import("module/MovieManage/AddFilm"));
const CinemaGroup = React.lazy(() => import("module/CinemaManage/CinemaGroup"));
const ScheduleFilm = React.lazy(() => import("module/MovieManage/ScheduleFilm"));
const SeatMap = React.lazy(() => import("module/MovieManage/SeatMap"));

const RoutesComponent = () => {
  return (
    <Suspense fallback={<>Error</>}>
      <Router>
        <Routes>
          {/* Main Layout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/detail/:idDetail" element={<MovieDetail />} />
            <Route path="/user" element={<Profile />} />
            <Route path="/news/:idNewsDetail" element={<NewsDetail />} />
            <Route path="/booking/:idTicketRoom" element={<TicketRoom />} />
          </Route>
          {/* Admin Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<MainManage />} />
            <Route path="user-manage" element={<UserManage />} />
            <Route path="movie-manage">
              <Route index element={<MovieManage />} />
              <Route path="edit-film/:idMovieEdit" element={<EditFilm />} />
              <Route path="add-film" element={<AddFilm />} />
              <Route path="seat-map/:idTicketRoom" element={<SeatMap />} />
              <Route path="schedule/:idSchedule" element={<ScheduleFilm />} />
            </Route>
            <Route path="cinema-manage">
              <Route index element={<CinemaManage />} />
              <Route path=":cinemaSystem/:cinemaName" element={<CinemaGroup />} />
            </Route>
          </Route>
          {/* Auth Layout */}
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          {/* Not Found 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default RoutesComponent;
