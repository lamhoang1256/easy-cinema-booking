import CinemaInformation from "module/cinema/CinemaInfomation";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const SignUp = React.lazy(() => import("pages/Authentication/SignUp"));
const SignIn = React.lazy(() => import("pages/Authentication/SignIn"));
const MovieDetail = React.lazy(() => import("pages/MovieDetail/MovieDetail"));
const Booking = React.lazy(() => import("pages/Booking/Booking"));
// need optimize
const DashboardLayout = React.lazy(() => import("module/dashboard/DashboardLayout"));
const MainLayout = React.lazy(() => import("layouts/MainLayout"));
const Home = React.lazy(() => import("pages/Home"));
const Profile = React.lazy(() => import("pages/Profile"));
const NewsDetail = React.lazy(() => import("pages/NewsDetail"));
const NotFound = React.lazy(() => import("pages/NotFound"));
const UserManage = React.lazy(() => import("module/user/UserManage"));
const UserUpdate = React.lazy(() => import("module/user/UserUpdate"));
const UserHistory = React.lazy(() => import("module/user/UserHistory"));
const BookingHistory = React.lazy(() => import("module/booking/BookingHistory"));
const MovieManage = React.lazy(() => import("module/movie/MovieManage"));
const ComplexesManage = React.lazy(() => import("module/cinema/ComplexesManage"));
const MainManage = React.lazy(() => import("pages/MainManage"));
const MovieAddNew = React.lazy(() => import("module/movie/MovieAddNew"));
const ShowtimeManage = React.lazy(() => import("module/showtime/ShowtimeManage"));
const ShowtimeAddNew = React.lazy(() => import("module/showtime/ShowtimeAddNew"));
const ShowtimeUpdate = React.lazy(() => import("module/showtime/ShowtimeUpdate"));
const ShowtimeView = React.lazy(() => import("module/showtime/ShowtimeView"));
const MovieUpdate = React.lazy(() => import("module/movie/MovieUpdate"));
const CinemaManage = React.lazy(() => import("module/cinema/CinemaManage"));

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
            <Route path="/user-history" element={<UserHistory />} />
            <Route path="/news/:idNewsDetail" element={<NewsDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/booking-history/:id" element={<BookingHistory />} />
          </Route>
          {/* Admin Layout */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<MainManage />} />
            <Route path="user-manage" element={<UserManage />} />
            <Route path="update-user/:id" element={<UserUpdate />} />
            <Route path="movie-manage">
              <Route index element={<MovieManage />} />
              <Route path="edit-film/:idMovieEdit" element={<MovieUpdate />} />
              <Route path="add" element={<MovieAddNew />} />
            </Route>
            <Route path="cinema-manage">
              <Route index element={<ComplexesManage />} />
              <Route path=":id" element={<CinemaManage />} />
              <Route path="information/:id" element={<CinemaInformation />} />
            </Route>
            <Route path="showtime-manage">
              <Route index element={<ShowtimeManage />} />
              <Route path="add" element={<ShowtimeAddNew />} />
              <Route path="update/:id" element={<ShowtimeUpdate />} />
              <Route path="view/:id" element={<ShowtimeView />} />
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
