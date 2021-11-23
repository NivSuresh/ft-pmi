import React, { useContext, useEffect, useState } from "react";
import { ActiveContext } from "../../contexts/ActiveContext";
import dataFile from "../../data";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ArticleCta from "./ArticleCta";
import RelatedContent from "./RelatedContent";

const ContentItem = ({ data }) => {
  const goHome = useContext(ActiveContext)[4];
  const [contentState, setContentState] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);
  const chosenArticle = dataFile.articles.filter(
    (article) => article.id === data
  )[0];

  const transition = {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96],
  };

  const imageVariants = {
    exit: { x: "50%", opacity: 0, transition },
    enter: {
      x: "0%",
      opacity: 1,
      transition: { delay: 1, ...transition },
    },
  };

  function handleHomeButton() {
    setContentState(true);

    setTimeout(() => {
      goHome();
    }, 500);
  }
  const titleV = {
    enter: {
      y: 0,
      opacity: 1,
      transition,
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition,
    },
  };

  const textVariants = {
    exit: { y: "30%", opacity: 0, transition },
    enter: {
      y: "0%",
      opacity: 1,
      transition: { delay: 1, ...transition },
    },
  };

  function isAricle() {
    let cn = "contentItem";
    if (chosenArticle) {
      if (chosenArticle.type === "Video") {
        cn = "contentItem -videoPlayer";
      }
    }
    return cn;
  }

  return (
    <div>
      <motion.div
        className={isAricle()}
        key='contentItem'
        initial='exit'
        animate={contentState ? "exit" : "enter"}
        exit='exit'
      >
        {chosenArticle ? (
          <div>
            <div className='hero-wrapper'>
              {chosenArticle.type === "Video" ? (
                <motion.iframe
                  variants={imageVariants}
                  src={chosenArticle.video}
                  controls
                  autoPlay
                  muted
                  className='hero__main-img'
                  exit='exit'
                  alt='main hero background'
                />
              ) : (
                <motion.img
                  variants={imageVariants}
                  src={chosenArticle.hero}
                  className='hero__main-img'
                  exit='exit'
                  alt='main hero background'
                />
              )}
            </div>
            <div className='wrap'>
              <div className='content__item-heading'>
                <div
                  className='content__item-heading-home'
                  onClick={handleHomeButton}
                >
                  <img src={require("../../assets/icons/home.png")} alt='' />
                </div>
                <div className='content__item-heading-title'>
                  <motion.h2
                    variants={titleV}
                    initial={{ opacity: 0, y: "100%" }}
                    animate={contentState ? "exit" : "enter"}
                    transition={transition}
                    exit={{ opacity: 0, y: "100%" }}
                    enter={{ opacity: 1, y: "0" }}
                  >
                    {chosenArticle.title}
                  </motion.h2>
                </div>
              </div>
              <div className='content__item-text'>
                <div className='content__item-text__content'>
                  <motion.div
                    variants={textVariants}
                    dangerouslySetInnerHTML={{ __html: chosenArticle.content }}
                  />
                </div>
                <ArticleCta link={chosenArticle.cta} />
              </div>
              <RelatedContent currentId={chosenArticle.id} />
            </div>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
};

export default ContentItem;
