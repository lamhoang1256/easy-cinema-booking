import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import RightSideNews from "components/RightSideNews/RightSideNews";
import { dataFakeNews } from "constants/dataFakeNews";

const Article = () => {
  return (
    <div className='article' id='article'>
      <h2 className='article-heading text--primary'>Tin tức</h2>
      {dataFakeNews ? (
        <div className='article-container'>
          <div className='article-main'>
            <Link to={`news/${dataFakeNews[0].id}`} className='article-main-image'>
              <img className='article-thumb' src={dataFakeNews[0].thumbnail} alt='article-image' />
            </Link>
            <div className='article-content'>
              <p className='article-time'>
                <ion-icon name='time-outline'></ion-icon> {dataFakeNews[0].createdAt}
              </p>
              <Link
                to={`news/${dataFakeNews[0].id}`}
                dangerouslySetInnerHTML={{ __html: dataFakeNews[0].title }}
              ></Link>
              <Link
                to={`news/${dataFakeNews[0].id}`}
                className='article-desc'
                dangerouslySetInnerHTML={{ __html: dataFakeNews[0].content }}
              ></Link>
            </div>
          </div>
          <RightSideNews />
        </div>
      ) : (
        <div className='article-skeleton'>
          <div className='article-skeleton-main'>
            <Skeleton height={480} borderRadius={10} />
          </div>
          <div className='article-skeleton-sub'>
            {[1, 2, 3].map((item) => (
              <div className='article-skeleton-sub-item' key={item}>
                <Skeleton height={"100%"} borderRadius={10} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;
