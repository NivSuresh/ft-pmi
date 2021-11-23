import React from "react";
import { motion } from "framer-motion";

const ThreeDotWave = () => {
  const loadingCV = {
    start: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const movingV = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  };

  const loadingCircleT = {
    duration: 0.5,
    yoyo: "Infinity",
    ease: "easeInOut",
  };

  return (
    <div className='loading'>
      <motion.div
        className='loading__container'
        variants={loadingCV}
        initial='start'
        animate='end'>
        <motion.span variants={movingV} transition={loadingCircleT} />
        <motion.span variants={movingV} transition={loadingCircleT} />
        <motion.span variants={movingV} transition={loadingCircleT} />
        <motion.span variants={movingV} transition={loadingCircleT} />
      </motion.div>
    </div>
  );
};

export default ThreeDotWave;
