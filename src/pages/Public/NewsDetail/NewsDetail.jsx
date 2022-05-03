import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Banner } from "components/Banner/Banner";
import { dataFakeNews } from "constants/dataFakeNews";
import { RightSideNews } from "components/RightSideNews/RightSideNews";
import "./newsDetail.scss";

const urlBanner = `url("${process.env.PUBLIC_URL}/assets/images/background-news.png"
)`;

export const NewsDetail = () => {
  const { idNewsDetail } = useParams();
  const dataPost = dataFakeNews.filter((news) => news.id == idNewsDetail)[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {dataPost ? (
        <div className='new-detail'>
          <Banner urlBanner={urlBanner} heading={"Trang tin chi tiết"} />
          <div className='container'>
            <div className='new-detail-main'>
              <div className='new-detail-left'>
                {dataPost && (
                  <div className='new-detail-post'>
                    <p dangerouslySetInnerHTML={{ __html: dataPost.createdAt }}></p>
                    <h2
                      className='new-detail-title'
                      dangerouslySetInnerHTML={{ __html: dataPost.title }}
                    ></h2>
                    <div
                      className='new-detail-content'
                      dangerouslySetInnerHTML={{ __html: dataPost.content }}
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
