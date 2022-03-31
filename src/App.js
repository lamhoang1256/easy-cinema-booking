import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdminLayout } from "./layouts/AdminLayout/AdminLayout";
import { AuthLayout } from "./layouts/AuthLayout/AuthLayout";
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import { HomePage } from "./pages/HomePage/HomePage";
import { MovieDetail } from "./pages/MovieDetail/MovieDetail";
import { UserInfo } from "./pages/UserInfo/UserInfo";
import { NotFound } from "./pages/NotFound/NotFound";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "antd/dist/antd.css";
import "./sass/app.scss";
import { NewsDetail } from "./pages/NewsDetail/NewsDetail";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Layout */}
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/detail/:id' element={<MovieDetail />} />
          <Route path='/user' element={<UserInfo />} />
          <Route path='/news' element={<NewsDetail />} />
        </Route>
        {/* Admin Layout */}
        <Route path='/admin' element={<AdminLayout />}></Route>
        {/* Auth Layout */}
        <Route path='/auth' element={<AuthLayout />}></Route>
        {/* Not Found 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
