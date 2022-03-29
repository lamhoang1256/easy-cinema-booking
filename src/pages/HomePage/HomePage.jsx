import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "./components/Carousel/Carousel";
import { FilterBooking } from "./components/FilterBooking/FilterBooking";
import { ModalTrailer } from "./components/ModalTrailer/ModalTrailer";
import { getMovieListAction } from "../../redux/actions/movieList.action";
import { Tabs } from "antd";
import "./homePage.scss";
import { ListMovie } from "./components/ListMovie/ListMovie";

export const HomePage = () => {
  const dispatch = useDispatch();
  // const [changeTab, setChangeTab] = useState(false);
  const { data, loading } = useSelector((state) => state.movieList);
  console.log(loading, data);

  // tab antd
  const { TabPane } = Tabs;
  // function callback(key) {
  //   console.log(key);
  //   setChangeTab(!changeTab);
  // }
  useEffect(() => {
    dispatch(getMovieListAction());
  }, []);

  return (
    <div className='homePage'>
      <div className='homePage__top'>
        <Carousel />
        <ModalTrailer />
      </div>
      <div className='homePage__main'>
        <FilterBooking />

        <div className='container'>
          {!loading ? (
            <div className='homePage__tab'>
              <Tabs defaultActiveKey='1'>
                <TabPane tab='Đang chiếu' key='1'>
                  <ListMovie listMovie={data.isShowingMovie} />
                </TabPane>
                <TabPane tab='Sắp chiếu' key='2'>
                  <ListMovie listMovie={data.comingSoonMovie} />
                </TabPane>
                <TabPane tab='Đang hot' key='3'>
                  <ListMovie listMovie={data.hotMovie} />
                </TabPane>
              </Tabs>
            </div>
          ) : (
            "Loading"
          )}
        </div>
      </div>
    </div>
  );
};
