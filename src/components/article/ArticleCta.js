import React, { useContext, useEffect, createRef } from "react";
import { SharingContext } from "../../contexts/SharingContext";
import oTracking from '@financial-times/o-tracking'

const ArticleCta = ({ link }) => {
  const shareObj = useContext(SharingContext);
  const ctaButton = createRef()

  useEffect(() => {

    oTracking.init(config_data);
    oTracking.click.init('cta');
  }, [config_data])


  var config_data = {
    server: "https://spoor-api.ft.com/px.gif",
    context: {
      product: "paid-post",
      content: {
      },
    },
    user: {
      ft_session: null,
    },
  };

  return (
    <div className='content-cta'>
        <a target='_blank' className='cta' ref={ctaButton} href={link}>
          Find out more about PMI's self-disruption{" "}
        </a>
      <div className='content-cta__share'>
        <span>Share on</span>
        <a href={shareObj.facebook} target='_blank' rel='noopener noreferrer'>
          <img
            className='paidPost-container-share__item-img'
            src={require("../../assets/socials/articleSocial/fb.png")}
            alt='facebook'
          />
        </a>
        <a href={shareObj.twitter} target='_blank' rel='noopener noreferrer'>
          <img
            className='paidPost-container-share__item-img'
            src={require("../../assets/socials/articleSocial/tw.png")}
            alt='twitter'
          />
        </a>
        <a href={shareObj.linkedIn} target='_blank' rel='noopener noreferrer'>
          <img
            className='paidPost-container-share__item-img'
            src={require("../../assets/socials/articleSocial/li.png")}
            alt='linkedin'
          />
        </a>

        <a href={shareObj.mail} target='_blank' rel='noopener noreferrer'>
          <img
            className='paidPost-container-share__item-img'
            src={require("../../assets/socials/articleSocial/mail.png")}
            alt='email'
          />
        </a>
      </div>
    </div>
  );
};

export default ArticleCta;
