import React, { useState, useContext, useEffect } from "react";
import dataFile from "../data";
import { ActiveContext } from "../contexts/ActiveContext";

const HeroBanner = () => {
  const [activeArticle, activeHero] = useContext(ActiveContext);
  useEffect(() => {}, [activeArticle, activeHero]);

  return (
    <div className='hero'>
      {activeArticle !== "home" ? (
        <div className='hero-article'>
          <picture>
            <source srcSet={activeHero.webp} type='image/webp' />
            <source srcSet={activeHero.jpg} type='image/jpg' />
            <source srcSet={activeHero.png} type='image/png' />
            <img
              src={activeHero.webp}
              className='hero__main-img'
              alt='main hero background'
            />
          </picture>
        </div>
      ) : null}

      <img
        className='hero__button'
        src={require("../assets/icons/down-arrow.svg")}
        alt=''
      />
    </div>
  );
};

export default HeroBanner;
