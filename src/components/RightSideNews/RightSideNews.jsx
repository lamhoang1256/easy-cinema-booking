import { Link } from "react-router-dom";
import { dataFakeNews } from "constants/dataFakeNews";
import "./rightSideNews.scss";

const RightSideNews = () => {
  const dataSideNews = dataFakeNews.filter((news) => news.id !== 1);

  return (
    <div className='rightside-news'>
      {dataSideNews &&
        dataSideNews.map((news, index) => (
          <Link to={`/news/${news.id}`} className='rightside-news-item' key={index}>
            <div className='rightside-news-image'>
              <img src={news.thumbnail} alt='' />
            </div>
            <div className='rightside-news-content'>
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

export default RightSideNews;
