import React, { useContext, useEffect } from "react";
import $ from "jquery";
import { SharingContext } from "../../contexts/SharingContext";

const PaidPostBug = () => {
  const shareObj = useContext(SharingContext);

  useEffect(() => {
    const pcTitleBtns = [...document.querySelectorAll(".pc__title-button")];
    const pcDisclaimer = document.querySelector(".pc__disclaimer");
    const pcDisclaimerBtn = document.querySelector(".pc__disclaimer-btn");
    const shareBtn = document.querySelector(".pc__share-btn");
    const shareContainer = document.querySelector(".pc__share-more");
    const shareClose = document.querySelector(".pc__share-more-close");

    const link = document.querySelector(".pc__share-more-btn__link.-link");
    const linkText = link.querySelector(".pc__share-more-link-btn-content");

    const shareText = document.querySelector(".pc__share-more-title");

    window.onscroll = function () {
      updateProgressBar();
    };

    pcTitleBtns.forEach((el, i) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        $(pcDisclaimer).fadeIn();

        setTimeout(() => {
          $(pcDisclaimer).fadeOut();
        }, 6000);
      });
    });

    pcDisclaimerBtn.addEventListener("click", (e) => {
      $(pcDisclaimer).fadeOut();
    });

    shareBtn.addEventListener("click", (e) => {
      e.preventDefault();
      $(shareContainer).fadeIn();
    });

    shareClose.addEventListener("click", (e) => {
      e.preventDefault();
      $(shareContainer).fadeOut();
    });

    link.addEventListener("click", (e) => {
      e.preventDefault();
      const orig = link.dataset.ori;
      const cp = link.dataset.cp;
      const url = window.location.href;

      navigator.clipboard.writeText(url).then(
        function () {
          linkText.innerText = cp;
          shareText.innerText = "Copied";
          setTimeout(() => {
            linkText.innerText = orig;
            shareText.innerText = "Share";
          }, 4000);
        },
        function (err) {
          console.error("Async: Could not copy text: ", err);
        }
      );
    });
  }, [shareObj]);

  function copyLink(e) {
    e.preventDefault();
    const share = e.target.dataset.share;
    const copy = e.target.dataset.copy;
    const span = document.querySelector(
      ".paidPost-container-share__content-share"
    );
    const link = e.target.querySelector("a").href;

    navigator.clipboard.writeText(link).then(
      function () {
        span.innerText = copy;
        setTimeout(() => {
          span.innerText = share;
        }, 2500);
      },
      function (err) {
        console.log(err);
      }
    );
  }

  function updateProgressBar() {
    var winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    var height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
  }

  const toggleDisclaimer = () => {
    const ds = $(".paidPost__disclaimer");
    ds.fadeIn();
    setTimeout(() => {
      ds.fadeOut();
    }, 4000);
  };

  return (
    <React.Fragment>
      <div className='pc m-pc'>
        <div className='tooltip-progress progress-container js-progress'>
          <div className='progress-bar' id='progressBar'></div>
        </div>
        <div className='pc-wrapper o-grid-container'>
          <div className='pc__client'>
            <div className='pc__client-title'>PMI</div>
            <div className='pc__client-disclaimers'>
              <div className='pc__title-button'>
                <img
                  alt='information_hover'
                  src={require("../../assets/static/pcHeader/information_hover.png")}
                />
              </div>
            </div>
          </div>
          <div className='pc__title'>
            <div className='pc__title-content'>Partner Content</div>
            <div className='pc__client-title'>PMI</div>
            <div className='pc__title-button'>
              <img
                alt='information_hover'
                src={require("../../assets/static/pcHeader/information_hover.png")}
              />
            </div>
          </div>
          <div className='pc__share'>
            <div className='pc__share-content'>Share</div>
            <div className='pc__share-btn'>
              <img
                alt='btn_export'
                src={require("../../assets/static/pcHeader/btn_export.png")}
              />
            </div>
          </div>
          <div className='pc__disclaimer'>
            <div className='pc__disclaimer-btn'>
              <img
                alt='close'
                src={require("../../assets/static/pcHeader/close.svg")}
              />
            </div>
            <div className='pc__disclaimer-content'>
              This content was paid for and produced by
              <a className='pc__disclaimer-content-link' href='#'>
                {" "}
                PMI{" "}
              </a>
              in partnership with the Commercial Department of the Financial
              Times.
            </div>
          </div>
          <div className='pc__share-more'>
            <div className='pc__share-more-close'>
              <img
                alt='btn_close'
                src={require("../../assets/static/pcHeader/close.svg")}
              />
            </div>
            <div className='pc__share-more-title'>Share</div>
            <div className='pc__share-more-btn'>
              <div className='pc__share-more-btn__link -fb'>
                <a href={shareObj.facebook}>
                  <div className='pc__share-more-link-btn'>
                    <div className='pc__share-more-link-btn-img'>
                      <img
                        alt='facebook'
                        src={require("../../assets/static/social/facebook.png")}
                      />
                    </div>
                    <div className='pc__share-more-link-btn-content'>
                      Share with Facebook
                    </div>
                  </div>
                </a>
              </div>
              <div className='pc__share-more-btn__link -tw'>
                <a href={shareObj.twitter}>
                  <div className='pc__share-more-link-btn'>
                    <div className='pc__share-more-link-btn-img'>
                      <img
                        alt='twitter'
                        src={require("../../assets/static/social/twitter.png")}
                      />
                    </div>
                    <div className='pc__share-more-link-btn-content'>
                      Share with Twitter
                    </div>
                  </div>
                </a>
              </div>
              <div className='pc__share-more-btn__link -li'>
                <a href={shareObj.linkedIn}>
                  <div className='pc__share-more-link-btn'>
                    <div className='pc__share-more-link-btn-img'>
                      <img
                        alt='linkedin'
                        src={require("../../assets/static/social/linkedin.png")}
                      />
                    </div>
                    <div className='pc__share-more-link-btn-content'>
                      Share with LinkedIn
                    </div>
                  </div>
                </a>
              </div>
              <div className='pc__share-more-btn__link -wa'>
                <a href={shareObj.whatsapp} data-action='share/whatsapp/share'>
                  <div className='pc__share-more-link-btn'>
                    <div className='pc__share-more-link-btn-img'>
                      <img
                        alt='whatsapp'
                        src={require("../../assets/static/social/whatsapp.png")}
                      />
                    </div>
                    <div className='pc__share-more-link-btn-content'>
                      Share with WhatsApp
                    </div>
                  </div>
                </a>
              </div>

              <div
                className='pc__share-more-btn__link -link'
                data-ori='Copy Link'
                data-cp='The link has been copied!'
              >
                <a href={shareObj.url}>
                  <div className='pc__share-more-link-btn'>
                    <div className='pc__share-more-link-btn-img'>
                      <img
                        alt='link'
                        src={require("../../assets/static/social/link.png")}
                      />
                    </div>
                    <div className='pc__share-more-link-btn-content'>
                      Copy Link
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
    // <div className='paidPost'>
    //   <div className='paidPost-wrapper o-header__container'>
    //     <div className='paidPost-container-title'>
    //       <button onClick={toggleDisclaimer}>i</button>
    //       <span>BrandSuite by</span>
    //       <img
    //         src={require("../../assets/logo/pmi-logo-dark.svg")}
    //         alt='logo'
    //       />
    //     </div>
    //     <div className='paidPost-container'>
    //       <div className='paidPost-container-share'>
    //         <div className='paidPost-container-share__icons'>
    //           <div className='paidPost-container-share__content'>
    //             <span className='paidPost-container-share__content-share'>
    //               Share
    //             </span>
    //             <img
    //               className='paidPost-container-share__content-exit'
    //               src={require("../../assets/socials/close-black.svg")}
    //               alt='logo'
    //             />
    //           </div>
    //           <div className='paidPost-container-share__iconWrapper'>
    //             <div className='paidPost-container-share__item'>
    //               <a
    //                 href={shareObj.facebook}
    //                 target='_blank'
    //                 rel='noopener noreferrer'>
    //                 <img
    //                   className='paidPost-container-share__item-img'
    //                   src={require("../../assets/socials/facebook.png")}
    //                   alt='facebook'
    //                 />
    //               </a>
    //               <span>{""}</span>
    //             </div>
    //             <div className='paidPost-container-share__item'>
    //               <a
    //                 target='_blank'
    //                 rel='noopener noreferrer'
    //                 href={shareObj.twitter}>
    //                 <img
    //                   className='paidPost-container-share__item-img'
    //                   src={require("../../assets/socials/twitter.png")}
    //                   alt='twitter'
    //                 />
    //               </a>
    //               <span>{""}</span>
    //             </div>
    //             <div className='paidPost-container-share__item'>
    //               <a
    //                 target='_blank'
    //                 rel='noopener noreferrer'
    //                 href={shareObj.linkedIn}>
    //                 <img
    //                   className='paidPost-container-share__item-img'
    //                   src={require("../../assets/socials/linkedin.png")}
    //                   alt='linked'
    //                 />
    //               </a>
    //               <span>{""}</span>
    //             </div>
    //             <div className='paidPost-container-share__item'>
    //               <a
    //                 target='_blank'
    //                 rel='noopener noreferrer'
    //                 href={shareObj.mail}>
    //                 <img
    //                   className='paidPost-container-share__item-img'
    //                   src={require("../../assets/socials/email.png")}
    //                   alt='email'
    //                 />
    //               </a>
    //               <span>{""}</span>
    //             </div>
    //             <div
    //               className='paidPost-container-share__item -copy'
    //               data-share={""}
    //               data-copy={""}
    //               onClick={(e) => copyLink(e)}>
    //               <a
    //                 target='_blank'
    //                 rel='noopener noreferrer'
    //                 href={shareObj.url}>
    //                 <img
    //                   className='paidPost-container-share__item-img'
    //                   src={require("../../assets/socials/link.png")}
    //                   alt='link'
    //                 />
    //               </a>
    //               <span>{""}</span>
    //             </div>
    //           </div>
    //         </div>

    //         <div className='paidPost-container-share__icon'>
    //           <img
    //             className='paidPost-container-share__icon-img'
    //             src={require("../../assets/socials/share.svg")}
    //             alt='share'
    //           />
    //         </div>
    //       </div>
    //     </div>
    //     <div className='paidPost__disclaimer'>
    //       Research and content produced on behalf of PMI by Longitude, a
    //       Financial Times company
    //     </div>
    //   </div>
    // </div>
  );
};

export default PaidPostBug;
