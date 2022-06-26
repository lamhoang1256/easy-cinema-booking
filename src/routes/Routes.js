import { path } from "constants/path";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

const MainLayout = React.lazy(() => import("layouts/MainLayout"));
const Dashboard = React.lazy(() => import("pages/Dashboard/Dashboard"));
const DashboardLayout = React.lazy(() => import("module/dashboard/DashboardLayout"));
const Home = React.lazy(() => import("pages/Home/Home"));
const Article = React.lazy(() => import("pages/Article/Article"));
const SearchMovie = React.lazy(() => import("pages/SearchMovie/SearchMovie"));
const UserManage = React.lazy(() => import("module/user/UserManage"));
const UserProfile = React.lazy(() => import("module/user/UserProfile"));
const UserUpdate = React.lazy(() => import("module/user/UserUpdate"));
const UserAddNew = React.lazy(() => import("module/user/UserAddNew"));
const UserHistory = React.lazy(() => import("module/user/UserHistory"));
const Booking = React.lazy(() => import("pages/Booking/Booking"));
const BookingHistory = React.lazy(() => import("module/booking/BookingHistory"));
const MovieManage = React.lazy(() => import("module/movie/MovieManage"));
const MovieDetailTmdb = React.lazy(() => import("pages/MovieDetail/MovieDetailTmdb"));
const MovieDetail = React.lazy(() => import("pages/MovieDetail/MovieDetail"));
const MovieAddNew = React.lazy(() => import("module/movie/MovieAddNew"));
const MovieUpdate = React.lazy(() => import("module/movie/MovieUpdate"));
const MovieView = React.lazy(() => import("module/movie/MovieView"));
const ShowtimeManage = React.lazy(() => import("module/showtime/ShowtimeManage"));
const ShowtimeAddNew = React.lazy(() => import("module/showtime/ShowtimeAddNew"));
const ShowtimeUpdate = React.lazy(() => import("module/showtime/ShowtimeUpdate"));
const ShowtimeView = React.lazy(() => import("module/showtime/ShowtimeView"));
const ComplexesManage = React.lazy(() => import("module/cinema/ComplexesManage"));
const CinemaManage = React.lazy(() => import("module/cinema/CinemaManage"));
const CinemaView = React.lazy(() => import("module/cinema/CinemaView"));
const SignUp = React.lazy(() => import("pages/Authentication/SignUp"));
const SignIn = React.lazy(() => import("pages/Authentication/SignIn"));
const NotFound = React.lazy(() => import("pages/NotFound/NotFound"));

const RoutesComponent = () => {
  return (
    <Suspense fallback={<></>}>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={path.home} element={<Home />} />
            <Route path={`${path.detail}/:id/*`} element={<MovieDetail />} />
            <Route path={`${path.detailTmdb}`} element={<MovieDetailTmdb />} />
            <Route path={`${path.article}/:id`} element={<Article />} />
            <Route path={`${path.search}`} element={<SearchMovie />} />
            <Route element={<ProtectedRoutes isAllowed={["admin", "user"]} />}>
              <Route path={`${path.booking}/:id`} element={<Booking />} />
              <Route path={path.history} element={<UserHistory />} />
              <Route path={path.profile} element={<UserProfile />} />
              <Route path={`${path.bookingHistory}/:id`} element={<BookingHistory />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoutes isAllowed={["admin"]} />}>
            <Route element={<DashboardLayout />}>
              <Route path={path.dashboard} element={<Dashboard />} />
              <Route path={path.userManage} element={<UserManage />} />
              <Route path={path.userAddNew} element={<UserAddNew />} />
              <Route path={`${path.userUpdate}/:id`} element={<UserUpdate />} />
              <Route path={path.movieManage} element={<MovieManage />} />
              <Route path={path.movieAddNew} element={<MovieAddNew />} />
              <Route path={`${path.movieView}/:id`} element={<MovieView />} />
              <Route path={`${path.movieUpdate}/:id`} element={<MovieUpdate />} />
              <Route path={path.complexesManage} element={<ComplexesManage />} />
              <Route path={`${path.cinemaView}/:id`} element={<CinemaView />} />
              <Route path={`${path.cinemaManage}/:id`} element={<CinemaManage />} />
              <Route path={path.showtimeManage} element={<ShowtimeManage />} />
              <Route path={path.showtimeAddNew} element={<ShowtimeAddNew />} />
              <Route path={`${path.showtimeUpdate}/:id`} element={<ShowtimeUpdate />} />
              <Route path={`${path.showtimeView}/:id`} element={<ShowtimeView />} />
            </Route>
          </Route>
          <Route path={path.signIn} element={<SignIn />} />
          <Route path={path.signUp} element={<SignUp />} />
          <Route path={path.notFound} element={<NotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default RoutesComponent;
