import React, { useContext, useEffect, useState } from "react";
import dataFile from "../../data";
import ArticleItem from "./ArticleItem";
import { ActiveContext } from "../../contexts/ActiveContext";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import ContentItem from "./ContentItem";

const Grid = (props) => {
  const activeArticle = useContext(ActiveContext)[0];
  const [activeState, setActiveState] = useState(false);

  useEffect(() => {
    activeArticle === "/"
      ? setActiveState(false)
      : toggleActiveArticle(activeArticle);

    setTimeout(() => {
      const btt = document.querySelector(".hero__main-arrow");
      if (btt) {
        btt.addEventListener("click", scrollDown);
        return () => {
          btt.removeEventListener("click", scrollDown);
        };
      }
    }, 1000);
  }, [activeArticle]);

  const scrollDown = () => {
    document.querySelector(".grid").scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  function toggleActiveArticle(activeArticle) {
    console.log("is this?", activeArticle);
    const tb = [...document.querySelectorAll(".grid__item")].filter(
      (thumbnail) => thumbnail.dataset.ref === JSON.stringify(activeArticle)
    )[0];
    setTimeout(() => {
      setActiveState(true);
    }, 500);
  }

  const transition = {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96],
  };

  const imageVariants = {
    exit: { y: "50%", opacity: 0, transition },
    enter: {
      y: "0%",
      opacity: 1,
      transition,
    },
    initial: {
      y: "50%",
      opacity: 0,
      transition,
    },
  };

  const thumbnails = {
    exit: {
      transition: { staggerChildren: 0.1, delay: 0.5, ...transition },
    },
  };

  const textVariants = {
    exit: { y: "0%", opacity: 0, transition },
    enter: {
      y: "-50%",
      opacity: 1,
      transition,
    },
  };

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

  return (
    <div className='main'>
      <AnimatePresence initial={true}>
        {activeState === false ? (
          <motion.div
            initial='enter'
            key='gridContainer'
            className='hero-container-wrapper'>
            <div className='hero-wrapper'>
              <motion.div
                className='hero__main-arrow'
                variants={textVariants}
                initial={{ opacity: 0, y: "100%" }}
                animate={activeState ? "exit" : "enter"}
                transition={transition}
                exit={{ opacity: 0, y: "100%" }}
                enter={{ opacity: 1, y: "0" }}>
                <img
                  src={require("../../assets/icons/socialDownWhite.svg")}
                  alt=''
                />
              </motion.div>
              <picture>
                <source
                  srcSet={require("../../assets/bg/pmi-background.webp")}
                  type='image/webp'
                />
                <source
                  srcSet={require("../../assets/bg/pmi-background.jpg")}
                  type='image/jpg'
                />
                <source
                  srcSet={require("../../assets/bg/pmi-background.png")}
                  type='image/png'
                />
                <motion.img
                  variants={imageVariants}
                  src={require("../../assets/bg/pmi-background.webp")}
                  className='hero__main-img'
                  initial={{ opacity: 0, y: "100%" }}
                  animate={activeState ? "exit" : "enter"}
                  transition={transition}
                  exit={{ opacity: 0, y: "100%" }}
                  enter={{ opacity: 1, y: "0" }}
                  alt='main hero background'
                />
              </picture>
              <div className='hero__main-content'>
                <div className='wrap'>
                  <motion.div
                    className='hero__main-content-wrapper'
                    variants={textVariants}>
                    <div className='hero__main-content-title'>
                      <h1>{dataFile.hero.title}</h1>
                    </div>
                    <div className='hero__main-content-desc'>
                      {dataFile.hero.description}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
            <motion.div />
            <div className='wrap'>
              <div className='hero__title'>
                <motion.h1
                  variants={titleV}
                  initial={{ opacity: 0, y: "100%" }}
                  animate={activeState ? "exit" : "enter"}
                  transition={transition}
                  exit={{ opacity: 0, y: "100%" }}
                  enter={{ opacity: 1, y: "0" }}>
                  {dataFile.hero.subtitle}
                </motion.h1>
              </div>
              <motion.div
                className='grid'
                initial='initial'
                animate={activeState ? "exit" : "enter"}
                exit='exit'
                variants={thumbnails}>
                {dataFile.articles.map((item, i) => {
                  return <ArticleItem data={item} key={i} />;
                })}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <ContentItem data={activeArticle} activeState={activeState} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Grid;
