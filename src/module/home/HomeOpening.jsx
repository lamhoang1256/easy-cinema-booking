import styled from "styled-components";
import { Tabs } from "antd";
import Skeleton from "react-loading-skeleton";
import HomeOpeningTheaters from "./HomeOpeningTheaters";

const StyledShowTime = styled.div`
  @import "../abstracts/global.scss";
  padding-top: 40px;
  border-radius: 20px;
  background-color: var(--darker-color);
  .heading {
    padding-left: 20px;
    margin-bottom: 10px;
    color: var(--white);
  }
  & > .ant-tabs-top > .ant-tabs-nav {
    padding-left: 20px;
  }
  .theater-logo {
    width: 40px;
  }
  .theater-name {
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--white);
  }
  .ant-tabs-left > .ant-tabs-nav {
    min-width: 350px;
  }
  .ant-tabs-content-holder {
    width: 100%;
  }
  .ant-tabs-left .ant-tabs-tab + .ant-tabs-tab {
    margin: 0;
  }
  .ant-tabs-left .ant-tabs-tab {
    padding: 14px 20px;
  }
  .ant-tabs-left .ant-tabs-tab.ant-tabs-tab-active {
    background-image: var(--primary-gradient);
  }
`;

export const Showtime = ({ showtimeList }) => {
  const { TabPane } = Tabs;
  if (!showtimeList) return <Skeleton height={300} borderRadius={10} />;
  return (
    <StyledShowTime>
      <h2 className="heading">Lịch chiếu phim</h2>
      <Tabs defaultActiveKey="0" tabPosition="top">
        {showtimeList.map(({ logo, lstCumRap }, index) => (
          <TabPane tab={<img className="theater-logo" src={logo} alt="logo" />} key={index}>
            <Tabs defaultActiveKey="0" tabPosition="left">
              {lstCumRap.map((theaters, index) => (
                <TabPane
                  key={index}
                  tab={<span className="theater-name">{theaters.tenCumRap}</span>}
                >
                  <HomeOpeningTheaters data={theaters} />
                </TabPane>
              ))}
            </Tabs>
          </TabPane>
        ))}
      </Tabs>
    </StyledShowTime>
  );
};

export default Showtime;
