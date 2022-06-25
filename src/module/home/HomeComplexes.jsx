import styled from "styled-components";
import { Tabs } from "antd";
import Tag from "components/tag/Tag";
import HomeCinemas from "./HomeCinemas";
import Section from "components/section/Section";
import LoadingSpinner from "components/loading/LoadingSpinner";

const StyledHomeComplexes = styled.div`
  margin-top: 40px;
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
    background-color: var(--white);
    border-radius: 100rem;
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
  .ant-tabs .ant-tabs-top .ant-tabs-content-holder {
    padding: 0 20px;
  }
  .nohave {
    padding: 20px;
    color: var(--white);
  }
  @media screen and (max-width: 767.98px) {
    .ant-tabs-tab + .ant-tabs-tab {
      margin: 0 0 0 15px;
    }
  }
`;

export const HomeComplexes = ({ cinemaComplexes }) => {
  const { TabPane } = Tabs;
  if (!cinemaComplexes) return <LoadingSpinner />;
  if (cinemaComplexes.length === 0)
    return (
      <Section>
        <Tag kind="secondary" className="heading">
          All showtimes
        </Tag>
        <h4>The movie not have showtime</h4>
      </Section>
    );

  return (
    <StyledHomeComplexes id="showtimes">
      <Tag kind="secondary" className="heading">
        All showtimes
      </Tag>
      <Tabs defaultActiveKey="0" tabPosition="top">
        {cinemaComplexes.map(({ logo, cinemas }, index) => (
          <TabPane key={index} tab={<TabLogo url={logo} />}>
            <HomeCinemas cinemas={cinemas} />
          </TabPane>
        ))}
      </Tabs>
    </StyledHomeComplexes>
  );
};

const TabLogo = ({ url }) => <img className="theater-logo" src={url} alt="logo" />;

export default HomeComplexes;
