import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Banner from "components/Banner/Banner";
import RightSideNews from "components/RightSideNews/RightSideNews";
import { dataFakeNews } from "constants/dataFakeNews";

const urlBanner = `${process.env.PUBLIC_URL}/assets/images/background/news.png`;
const NewsDetail = () => {
  const { idNewsDetail } = useParams();
  const news = dataFakeNews.filter((news) => news.id == idNewsDetail)[0];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {news ? (
        <div className='new-detail'>
          <Banner urlBanner={`url(${urlBanner})`} heading={"Trang tin chi tiết"} />
          <div className='container'>
            <div className='new-detail-main'>
              <div className='new-detail-left'>
                {news && (
                  <div className='new-detail-post'>
                    <p dangerouslySetInnerHTML={{ __html: news.createdAt }}></p>
                    <h2
                      className='new-detail-title'
                      dangerouslySetInnerHTML={{ __html: news.title }}
                    ></h2>
                    <div
                      className='new-detail-content'
                      dangerouslySetInnerHTML={{ __html: news.content }}
                    ></div>
                  </div>
                )}
              </div>

              <div className='new-detail-right'>
                <RightSideNews />
              </div>
            </div>
          </div>
        </div>
      ) : (
        "Tin tức này không tồn tại"
      )}
    </>
  );
};
export default NewsDetail;
