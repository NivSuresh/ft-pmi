import React from "react";
import Header from "./components/includes/Header";
import Footer from "./components/includes/Footer";
import PaidPostBug from "./components/includes/PaidPostBug";
import GridContainer from "./components/GridContainer";
import HeroBanner from "./components/HeroBanner";
import Follow from "./components/social/Follow";
import ThreeDotWave from "./components/loading/ThreeDotWave";
import dataFile from "./data";

function App() {
  return (
    <div className='App'>
      <Header />
      <PaidPostBug />
      <div className='article-wrapper'>
        <GridContainer />
        <Follow />
      </div>
      <Footer />
    </div>
  );
}

export default App;
