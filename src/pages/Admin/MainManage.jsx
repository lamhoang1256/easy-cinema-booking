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
            <MainManageCard
              thumb='https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h_gp00.jpg'
              title='Lật mặt 48h'
            />
            <MainManageCard
              thumb='https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h_gp00.jpg'
              title='Lật mặt 48h'
            />
            <MainManageCard
              thumb='https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h_gp00.jpg'
              title='Lật mặt 48h'
            />
            <MainManageCard
              thumb='https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h_gp00.jpg'
              title='Lật mặt 48h'
            />
          </div>
        </div>
      </div>

      <div className='main-manage-rating'>
        <h3>Phim được đánh giá cao</h3>
        <MainManageBoxed
          thumb='https://movienew.cybersoft.edu.vn/hinhanh/avenger-end-game_gp05.jpg'
          title='Avengers: Endgame'
          feature='Marvel'
          color='#ff1b1b'
          openday='09 Jan 2022'
          progress='70%'
          duration='2:09:10'
          love={true}
        ></MainManageBoxed>
        <MainManageBoxed
          thumb='https://movienew.cybersoft.edu.vn/hinhanh/the-scary-stories_gp07.jpg'
          title='The Scary Stories'
          feature='Comedy'
          color='#9584f2'
          openday='04 Nov 2021'
          progress='87%'
          duration='2:23:20'
          love={false}
        ></MainManageBoxed>
        <MainManageBoxed
          thumb='https://movienew.cybersoft.edu.vn/hinhanh/the-batman_gp01.jpg'
          title='The Batman'
          feature='Advanture'
          color='#4fcdff'
          openday='13 Sep 2021'
          progress='70%'
          duration='2:30:00'
          love={true}
        ></MainManageBoxed>
      </div>
    </div>
  );
};

const MainManageCard = ({ thumb, title }) => (
  <div className='main-manage-item'>
    <img src={thumb} className='main-manage-thumb' alt='manage-img' />
    <h3 className='main-manage-title'>{title}</h3>
    <p className='main-manage-type'>Comedy</p>
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
