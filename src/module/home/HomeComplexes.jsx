import styled from "styled-components";
import { Tabs } from "antd";
import Skeleton from "react-loading-skeleton";
import Tag from "components/tag/Tag";
import HomeCinemas from "./HomeCinemas";

const StyledHomeComplexes = styled.div`
  padding-top: 40px;
  border-radius: 20px;
  background-color: var(--darker-color);
  .heading {
    padding-left: 20px;
    margin-bottom: 10px;
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
  .ant-tabs-top > .ant-tabs-nav {
    padding-left: 10px;
  }
`;

export const HomeComplexes = ({ cinemaComplexes }) => {
  const { TabPane } = Tabs;
  if (!cinemaComplexes) return <Skeleton height={300} borderRadius={10} />;
  return (
    <StyledHomeComplexes>
      <Tag kind="secondary" className="heading">
        Lịch chiếu phim
      </Tag>
      <Tabs defaultActiveKey="0" tabPosition="top">
        {/* Render danh sách các hệ thống rạp VD: CVG, BHD, Galaxy */}
        {cinemaComplexes.map(({ logo, cinemas }, index) => (
          <TabPane key={index} tab={<TabLogo url={logo?.split("public/default")[1]} />}>
            <HomeCinemas cinemas={cinemas} />
          </TabPane>
        ))}
      </Tabs>
    </StyledHomeComplexes>
  );
};

const TabLogo = ({ url }) => <img className="theater-logo" src={url} alt="logo" />;

export default HomeComplexes;
