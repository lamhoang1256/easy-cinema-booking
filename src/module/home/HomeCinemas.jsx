import { Tabs } from "antd";
import { useMediaQuery } from "hooks/useMediaQuery";
import styled from "styled-components";
import HomeScreens from "./HomeScreens";

const StyledHomeCinemas = styled.div`
  .ant-tabs-left .ant-tabs-tab + .ant-tabs-tab {
    margin: 0;
  }
  .ant-tabs-left .ant-tabs-tab,
  .ant-tabs-top .ant-tabs-tab {
    padding: 14px 20px;
  }
  .ant-tabs-left .ant-tabs-tab.ant-tabs-tab-active {
    background-image: var(--gradient-primary);
  }
`;

const HomeCinemas = ({ cinemas }) => {
  const { TabPane } = Tabs;
  const isMobile = useMediaQuery("(max-width:767.98px)");
  if (cinemas?.length === 0) return <h3 className="nohave">No cinema</h3>;
  return (
    <StyledHomeCinemas>
      <Tabs defaultActiveKey="0" tabPosition={isMobile ? "top" : "left"}>
        {cinemas.map((cinema, index) => (
          <TabPane key={index} tab={<TabName name={cinema.name} />}>
            <HomeScreens cinemas={cinema.screens} />
          </TabPane>
        ))}
      </Tabs>
    </StyledHomeCinemas>
  );
};

const TabName = ({ name }) => <span className="theater-name">{name}</span>;

export default HomeCinemas;
