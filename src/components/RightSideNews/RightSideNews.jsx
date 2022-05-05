import { Link } from "react-router-dom";
import { dataFakeNews } from "constants/dataFakeNews";
import "./rightSideNews.scss";

export const RightSideNews = () => {
  const dataSideNews = dataFakeNews.filter((news) => news.id !== 1);

  return (
    <div className='sidenews'>
      {dataSideNews &&
        dataSideNews.map((news, index) => (
          <Link to={`/news/${news.id}`} className='sidenews-item' key={index}>
            <div className='sidenews-image'>
              <img src={news.thumbnail} alt='' />
            </div>
            <div className='sidenews-content'>
              <p className='article-time'>
                <ion-icon name='time-outline'></ion-icon> {news.createdAt}
              </p>
              <div className='article-title' dangerouslySetInnerHTML={{ __html: news.title }}></div>
              <div
                className='article-desc'
                dangerouslySetInnerHTML={{ __html: news.content }}
              ></div>
            </div>
          </Link>
        ))}
    </div>
  );
};
