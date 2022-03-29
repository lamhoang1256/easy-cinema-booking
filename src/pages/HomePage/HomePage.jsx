import { Carousel } from "./components/Carousel/Carousel";
import { FilterBooking } from "./components/FilterBooking/FilterBooking";
import { ListMovie } from "./components/ListMovie/ListMovie";
import { ModalTrailer } from "./components/ModalTrailer/ModalTrailer";
import { Tabs } from "antd";
import "./homePage.scss";

export const HomePage = () => {
  const { TabPane } = Tabs;
  function callback(key) {
    console.log(key);
  }
  return (
    <div className='homePage'>
      <div className='homePage__top'>
        <Carousel />
        <ModalTrailer />
      </div>
      <div className='homePage__main'>
        <FilterBooking />

        <div className='container'>
          <div className='homePage__tab'>
            <Tabs defaultActiveKey='1' onChange={callback}>
              <TabPane tab='Đang chiếu' key='1'>
                <ListMovie />
              </TabPane>
              <TabPane tab='Sắp chiếu' key='2'>
                <ListMovie />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
