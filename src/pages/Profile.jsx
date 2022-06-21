import styled from "styled-components";
const urlBanner = `url("/assets/images/background/news.png")`;

const StyledProfile = styled.div`
  .profile-header {
    transform: translateY(-20%);
    margin-bottom: -20px;
    gap: 0 40px;
    display: flex;
    align-items: center;
  }
  .profile-avatar {
    overflow: hidden;
    border: 3px solid #fff;
    border-radius: 100rem;
    width: 200px;
    height: 200px;
  }
  // style css tab antd
  .ant-tabs-top > .ant-tabs-nav .ant-tabs-tab {
    padding: 0;
    margin: 0;
    margin-bottom: 10px;
  }
  .ant-tabs-top .ant-tabs-tab .ant-tabs-tab-btn {
    padding: 10px 20px;
    border-radius: 4px;
    min-width: 180px;
    color: var(--white);
  }
  .ant-tabs-top .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    background-image: var(--gradient-primary);
  }
  @media screen and (max-width: 1023.98px) {
    .ant-tabs-top .ant-tabs {
      flex-direction: column;
    }
    .ant-tabs-top > div > .ant-tabs-content-holder {
      margin-top: 30px;
    }
  }
  @media screen and (max-width: 767.98px) {
    .profile-top {
      flex-direction: column;
    }
    .profile-avatar {
      width: 160px;
      height: 160px;
    }
  }
`;

const Profile = () => {
  return <>Profile</>;
};

export default Profile;
