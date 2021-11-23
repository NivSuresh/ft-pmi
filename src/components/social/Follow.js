import React, { useEffect, useCallback } from "react";

const Follow = () => {
  useEffect(() => {
    const btt = document.querySelector(".follow-container__content-btt");
    btt.addEventListener("click", scrollUp);
    return () => {
      btt.removeEventListener("click", scrollUp);
    };
  }, []);

  const scrollUp = useCallback(() => {
    window.scrollTo(0, 1);
  });

  return (
    <div className='follow-container'>
      <div className='follow-container__wrapper wrap'>
        <div className='follow-container__logo'>
          <img src={require("../../assets/logo/pmi-logo.svg")} alt='pmi-logo' />
        </div>
        <div className='follow-container__content'>
          <div className='follow-container__content-social'>
            <span>Follow Phillip Morris International on</span>
            <div className='follow-container__content-social-btns'>
              <a href='https://www.facebook.com/InsidePMI/'>
                <img
                  src={require("../../assets/socials/socialContainer/fb.svg")}
                  alt='facebook'
                />
              </a>
              <a href='https://twitter.com/insidepmi'>
                <img
                  src={require("../../assets/socials/socialContainer/tw.svg")}
                  alt='twitter'
                />
              </a>
              <a href='https://www.youtube.com/channel/UC8Ljkwa0c7Njol3g7LGW2Ww'>
                <img
                  src={require("../../assets/socials/socialContainer/yt.svg")}
                  alt='youtube'
                />
              </a>
              <a href='https://www.linkedin.com/company/insidepmi/'>
                <img
                  src={require("../../assets/socials/socialContainer/li.svg")}
                  alt='linkedin'
                />
              </a>
              <a
                className='follow-container__content-gd'
                href='https://www.glassdoor.co.uk/Overview/Working-at-Philip-Morris-International-EI_IE7745.11,38.htm'>
                <img
                  src={require("../../assets/socials/socialContainer/gd.png")}
                  alt='glassdoor'
                />
              </a>
            </div>
          </div>
          <div className='follow-container__content-btt'>
            <button>
              <img src={require("../../assets/icons/socialDown.svg")} alt='' />
            </button>
            <span>Back to top</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Follow;
