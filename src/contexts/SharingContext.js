import React, { createContext, useEffect, useState, useContext } from "react";
import { ActiveContext } from "../contexts/ActiveContext";
import dataFile from "../data";

export const SharingContext = createContext();

export const SharingProvider = (props) => {
  const activeArticle = useContext(ActiveContext)[0];

  const [shareObj, setShareObj] = useState({
    facebook: "",
    twitter: "",
    linkedIn: "",
    mail: "",
    url: "",
  });

  useEffect(() => {
    const tagLine = encodeURIComponent(dataFile.hero.description);
    const summary = encodeURIComponent(dataFile.hero.tagLine);
    const encodedURL = encodeURI(window.location.href);

    setShareObj({
      facebook: `http://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedURL}`,
      linkedIn: `http://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}&source=@ft_content`,
      mail: `mailto:?subject=${tagLine} - PMI&body=${summary} Read More: ${encodedURL}`,
      whatsapp: `https://wa.me/?text=PMI-${tagLine}-${encodedURL}`,
      url: window.location.href,
    });
  }, [activeArticle]);

  return (
    <SharingContext.Provider value={shareObj}>
      {props.children}
    </SharingContext.Provider>
  );
};
