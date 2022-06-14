import { Collapse, Tabs } from "antd";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { HomeOpeningMovies } from "./HomeOpeningMovies";

const StyledHomeOpeningMobile = styled.div`
  .ant-collapse-header {
    background-color: var(--purple-color);
    span {
      color: var(--white);
    }
  }
  .theater-logo {
    width: 50px;
  }
  .time-button {
    font-size: 1.4rem;
    padding: 0 8px;
  }
  .ant-collapse.ant-collapse-icon-position-left {
    border: 0;
  }
  .ant-collapse-content {
    background-color: #222;
  }
`;

const HomeHome = ({ showtimeList }) => {
  const { Panel } = Collapse;
  const { TabPane } = Tabs;
  if (!showtimeList) return <Skeleton height={400} />;
  return (
    <StyledHomeOpeningMobile>
      <h2 className="heading">Lịch chiếu phim</h2>
      <Tabs defaultActiveKey="0" tabPosition="top">
        {showtimeList.map(({ logo, lstCumRap }, index) => (
          <TabPane tab={<img className="theater-logo" src={logo} alt="logo" />} key={index}>
            <Collapse>
              {lstCumRap.map(({ tenCumRap, danhSachPhim }, index) => (
                <Panel header={<span>{tenCumRap}</span>} key={index}>
                  {danhSachPhim.map((movie, index) => (
                    <HomeOpeningMovies data={movie} key={index} />
                  ))}
                </Panel>
              ))}
            </Collapse>
          </TabPane>
        ))}
      </Tabs>
      )
    </StyledHomeOpeningMobile>
  );
};

export default HomeHome;
