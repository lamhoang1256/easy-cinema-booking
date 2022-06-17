import { Tabs } from "antd";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import Tag from "components/tag/Tag";
import Description from "components/text/Description";
import DetailTheaters from "./DetailTheaters";
const arrDate = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

const StyledDetailOpening = styled.div`
  .logo {
    width: 60px;
    height: 60px;
    background-color: var(--white);
    border-radius: 50%;
  }
  .ant-tabs-tab-active .tabpanel-header {
    border-bottom: 2px solid var(--secondary-color);
    padding-bottom: 4px;
  }
  .tabpanel-header {
    text-align: center;
    margin-bottom: 10px;
  }
  .tabpanel-header p {
    color: var(--white);
    font-weight: 600;
  }
  .tabpanel-header span {
    color: var(--gray-color);
  }
  @media screen and (max-width: 767.98px) {
    .logo {
      width: 40px;
      height: 40px;
    }
  }
`;

const DetailOpening = () => {
  const { TabPane } = Tabs;

  // if (calendarShowList?.length === 0) {
  //   return (
  //     <StyledDetailOpening>
  //       <Tag kind="secondary" marginTop="14px">
  //         Lịch chiếu phim
  //       </Tag>
  //       <Description>Phim này hiện chưa có lịch chiếu !</Description>
  //     </StyledDetailOpening>
  //   );
  // }

  return (
    <StyledDetailOpening>
      <Tag kind="secondary" marginTop="14px">
        Lịch chiếu phim
      </Tag>
      <div className="boxed">
        <Tabs defaultActiveKey="0">
          {/* {calendarShowList?.map(({ date, heThongRap }) => (
            <TabPane tab={<TabPanelHeader date={date} />} key={uuidv4()}>
              <Tabs defaultActiveKey="0" tabPosition="left">
                {heThongRap.map(({ logo, cumRapChieu }) => (
                  <TabPane key={uuidv4()} tab={<TabPanelLogo logo={logo} />}>
                    <DetailTheaters data={cumRapChieu} date={date} />
                  </TabPane>
                ))}
              </Tabs>
            </TabPane>
          ))} */}
        </Tabs>
      </div>
    </StyledDetailOpening>
  );
};

const TabPanelHeader = ({ date }) => (
  <div className="tabpanel-header">
    <p>{arrDate[new Date(date).getDay()]}</p>
    <span>{new Date(date).toLocaleDateString("vi-VI")}</span>
  </div>
);
const TabPanelLogo = ({ logo }) => <img className="logo" src={logo} alt="logo" />;

export default DetailOpening;
