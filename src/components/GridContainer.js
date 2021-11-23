import React, { useEffect, useContext } from "react";
import imagesLoaded from "imagesloaded";
import Grid from "./article/Grid";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const body = document.body;

setTimeout(() => {
  imagesLoaded(document.querySelectorAll(".grid__item-img"), () => {
    body.classList.remove("loading");
  });
}, 2000);

const GridContainer = () => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div>
      <div className='grid-wrapper'>
        <div className='grid-wrap'>
          <div className='grid-container'>
            <AnimatePresence>
              <Switch location={location} key={pathName}>
                <Route path='/' component={Grid} exact />
              </Switch>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridContainer;
