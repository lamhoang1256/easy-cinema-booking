import { dataFakeAdminRate, dataFakeAdminSale } from "constants/dataFakeAdminMain";
import React from "react";
import Chart from "react-apexcharts";
import "./mainManage.scss";

const MainManage = () => {
  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: ["BHDStar", "CGV", "CineStar", "LotteCinima", "MegaGS", "Galaxy"],
    },
  };
  const series = [
    {
      name: "Doanh thu",
      data: [3200, 4030, 2345, 4800, 3000, 6240],
    },
  ];

  return (
    <div className='main-manage'>
      <div className='main-manage-top'>
        <div className='main-manage-chart'>
          <h3>Doanh thu các cụm rạp tháng này</h3>
          <Chart options={options} series={series} type='bar' width='450' />
        </div>

        <div className='main-manage-sale'>
          <h3>Phim có doanh thu lớn</h3>
          <div className='main-manage-list'>
            {dataFakeAdminSale.map((movieCard, index) => (
              <MainManageCard key={index} thumb={movieCard.thumb} title={movieCard.title} />
            ))}
          </div>
        </div>
      </div>

      <div className='main-manage-rating'>
        <h3>Phim được đánh giá cao</h3>
        {dataFakeAdminRate.map((boxed, index) => (
          <MainManageBoxed
            key={index}
            thumb={boxed.thumb}
            title={boxed.title}
            feature={boxed.feature}
            color={boxed.color}
            openday={boxed.openday}
            progress={boxed.progress}
            duration={boxed.duration}
            love={boxed.love}
          ></MainManageBoxed>
        ))}
      </div>
    </div>
  );
};

const MainManageCard = ({ thumb, title }) => (
  <div className='main-manage-item'>
    <img src={thumb} className='main-manage-thumb' alt='manage-img' />
    <h4 className='main-manage-label'>{title}</h4>
  </div>
);

const MainManageBoxed = (props) => {
  const { thumb, title, feature, color, openday, progress, duration, love } = props;
  return (
    <div className='main-manage-boxed'>
      <img src={thumb} className='main-manage-thumb-square' alt='movie-thumb' />
      <h3 className='main-manage-title'>{title}</h3>
      <div className='main-manage-rate'>
        <ion-icon name='star'></ion-icon>
        <ion-icon name='star'></ion-icon>
        <ion-icon name='star'></ion-icon>
        <ion-icon name='star'></ion-icon>
        <ion-icon name='star-half'></ion-icon>
      </div>
      <div className='main-manage-feature' style={{ color: color }}>
        {feature}
      </div>
      <div>{openday}</div>
      <div className='main-manage-progress'>
        <div className='main-manage-progress-color' style={{ width: progress }}></div>
      </div>
      <div>{duration}</div>
      <div>
        {!love && <ion-icon name='heart-outline' style={{ fontSize: "20px" }}></ion-icon>}
        {love && <ion-icon name='heart' style={{ color: "red", fontSize: "20px" }}></ion-icon>}
      </div>
    </div>
  );
};

export default MainManage;
// 1510px laptop
