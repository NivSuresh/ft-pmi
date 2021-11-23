import React, { useEffect } from "react";
import Swiper from "swiper";
import ArticleItem from "./ArticleItem";
import dataFile from "../../data";

const RelatedContent = ({ currentId }) => {
  const relatedArticles = dataFile.articles.filter(
    (article) => article.id !== currentId
  );

  useEffect(() => {
    const swiper = document.querySelector(".swiper-container");
    const nextEl = swiper.querySelector(".swiper-button-next");
    const prevEl = swiper.querySelector(".swiper-button-prev");

    var mySwiper = new Swiper(swiper, {
      speed: 400,
      spaceBetween: 38,
      slidesPerView: 1,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
      },
      breakpoints: {
        // when window width is <= 499px
        499: {
          slidesPerView: 1,
          spaceBetweenSlides: 50,
        },
        // when window width is <= 999px
        999: {
          slidesPerView: 3,
          spaceBetweenSlides: 50,
        },
      },
      navigation: {
        nextEl,
        prevEl,
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
      },
    });

    nextEl.addEventListener("click", (e) => {
      mySwiper.slideNext();
    });

    prevEl.addEventListener("click", (e) => {
      mySwiper.slidePrev();
    });
  }, []);

  return (
    <div className='content-related'>
      <div className='content-related-title'>
        <h4>Related content</h4>
      </div>
      <div className='content-related__wrapper'>
        <div className='swiper-container'>
          <div className='swiper-wrapper'>
            {relatedArticles.map((item, i) => {
              return (
                <div key={i} className='swiper-slide'>
                  <ArticleItem data={item} />
                </div>
              );
            })}
          </div>
          <div className='swiper-pagination'></div>

          <div className='swiper-button-prev'></div>
          <div className='swiper-button-next'></div>
        </div>
      </div>
    </div>
  );
};

export default RelatedContent;
