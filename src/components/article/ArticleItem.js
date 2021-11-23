import React, { useEffect, useRef, useContext } from "react";
import Ellipsis from "ellipsis.js";
import { ActiveContext } from "../../contexts/ActiveContext";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

const ArticleItem = ({ data }) => {
  const desc = useRef();
  const setActiveArticle = useContext(ActiveContext)[2];
  const handleURLChange = useContext(ActiveContext)[3];

  useEffect(() => {
    const ellipsis = Ellipsis({
      ellipsis: "…",
      debounce: 0,
      className: false,
      responsive: false,
      lines: 2.5,
      break_word: false,
    });
    ellipsis.add(desc.current);
  }, []);

  const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

  const thumbnailVariants = {
    initial: { scale: 0.9, opacity: 0 },
    enter: { scale: 1, opacity: 1, transition },
    exit: {
      scale: 0.5,
      opacity: 0,
      transition: { duration: 1.5, ...transition },
    },
  };

  const frameVariants = {
    hover: { scale: 0.95 },
  };

  const imageVariants = {
    hover: { scale: 1.1 },
  };

  return (
    <div
      onClick={handleURLChange}
      data-ref={data.id}
      className={data.tag === "Video" ? "grid__item -video" : "grid__item"}
      data-size={data.large}>
      <motion.div className='thumbnail' variants={thumbnailVariants}>
        <motion.div
          className='frame'
          whileHover='hover'
          variants={frameVariants}
          transition={transition}>
          <div className='grid__item-bg'></div>
          <div className='grid__item-wrap'>
            <img
              src={data.hero}
              className='grid__item-img'
              alt='article image background'
            />
          </div>
          <div className='grid__item-content'>
            <div className='grid__item-content__tag'>
              <div className='grid__item-content__tag-item'>{data.tag}</div>
            </div>
            <div className='grid__item-content__title'>{data.title}</div>
            <div className='grid__item-content__desc' ref={desc}>
              {data.introduction}
            </div>
            <div className='grid__item-content__duration'>{data.duration}</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ArticleItem;
