/*eslint-disable*/
import React, { createContext, useState, useEffect } from "react";
import dataFile from "../data";
import { Switch, Route, useLocation } from "react-router-dom";
import { createBrowserHistory } from "history";

export const ActiveContext = createContext();

export const ActiveProvider = (props) => {
  const [activeArticle, setActiveArticle] = useState("/");
  const [activeHero, setActiveHero] = useState({});
  const html = document.querySelector("html");
  const location = useLocation().pathname;

  const history = createBrowserHistory({
    basename: "/partnercontent/scienceofselfdisruption",
  });

  let hash = history.location.hash;

  useEffect(() => {
    window.scrollTo(0, 1);
    window.addEventListener("popstate", (e) => {
      goHome();
    });

    let tagging = dataFile.tagging;

    if (hash) {
      hash = parseInt(hash.replace("#", ""));
      setActiveArticle(hash);
      tagging = dataFile.articles.filter((article) => article.id === hash)[0]
        .tagging;
    }
    console.log(document.title);
    document.title = tagging.title;
    const ATTENTION_INTERVAL = 15000;
    const ATTENTION_EVENTS = [
      "load",
      "click",
      "focus",
      "scroll",
      "mousemove",
      "touchstart",
      "touchend",
      "touchcancel",
      "touchleave",
    ];
    const UNATTENTION_EVENTS = ["blur"];
    const EXIT_EVENTS = ["beforeunload", "unload", "pagehide"];
    const broadcast = function (name, data, bubbles = true) {
      const rootEl = Element.prototype.isPrototypeOf(this)
        ? this
        : document.body;
      let event;

      try {
        event = new CustomEvent(name, {
          bubbles: bubbles,
          cancelable: true,
          detail: data,
        });
      } catch (e) {
        event = CustomEvent.initCustomEvent(name, true, true, data);
      }
      rootEl.dispatchEvent(event);
    };

    let events = {};
    const fireBeacon = (contextSource, percentage) => {
      const data = {
        action: "scrolldepth",
        category: "page",
        meta: {
          percentagesViewed: percentage,
          attention: events.attention.get(),
        },
        context: {
          product: "next",
          source: contextSource,
        },
      };
      broadcast("oTracking.event", data);
    };
    const customTracking = () => {
      function convertToBoolean(string) {
        if (string === "true") {
          return true;
        } else {
          return false;
        }
      }

      const data = {
        action: "view",
        category: "brandedContent",
        feature: tagging.feature,
        author: tagging.contentAuthor,
        sponsor: tagging.sponsor,
        articleName: tagging.title,
        campaign: tagging.campaignName,
        hasVideo: tagging.hasVideo,
        videoType: tagging.videoType,
        branded: tagging.brandedContent,
        primaryTopic: tagging.primaryTopic,
        secondaryTopic: tagging.secondaryTopic,
        advertiserIndustry: tagging.advertiserIndustry,
        contentType: tagging.contentType,
        app: tagging.articleApp,
        publishDate: tagging.pubDate,
      };
      broadcast("oTracking.event", data);
    };

    class Attention {
      constructor() {
        this.totalAttentionTime = 0;
        this.startAttentionTime;
        this.endAttentionTime;
        this.hasSentEvent = false;
      }

      init() {
        //Add events for all the other Attention events
        for (let i = 0; i < ATTENTION_EVENTS.length; i++) {
          window.addEventListener(ATTENTION_EVENTS[i], (ev) =>
            this.startAttention(ev)
          );
        }

        for (let i = 0; i < UNATTENTION_EVENTS.length; i++) {
          window.addEventListener(UNATTENTION_EVENTS[i], (ev) =>
            this.endAttention(ev)
          );
        }

        // Need to wait for this to be available
        if (window.Origami["o-viewport"]) {
          window.Origami["o-viewport"].listenTo("visibility");
        }
        document.body.addEventListener(
          "oViewport.visibility",
          (ev) => this.handleVisibilityChange(ev),
          false
        );

        this.addVideoEvents();

        // Add event to send data on unload
        EXIT_EVENTS.forEach((event) => {
          window.addEventListener(event, () => {
            if (this.hasSentEvent) {
              return;
            }
            this.hasSentEvent = true;
            this.endAttention();
            broadcast("oTracking.event", {
              category: "page",
              action: "interaction",
              context: {
                attention: {
                  total: this.totalAttentionTime,
                },
              },
            });
          });
        });
      }

      startAttention() {
        clearTimeout(this.attentionTimeout);
        if (!this.startAttentionTime) {
          this.startAttentionTime = new Date().getTime();
        }
        this.attentionTimeout = setTimeout(
          () => this.endAttention(),
          ATTENTION_INTERVAL
        );
      }

      startConstantAttention() {
        this.constantAttentionInterval = setInterval(
          () => this.startAttention(),
          ATTENTION_INTERVAL
        );
      }

      endConstantAttention() {
        this.endAttention();
        clearInterval(this.constantAttentionInterval);
      }

      endAttention() {
        if (this.startAttentionTime) {
          this.endAttentionTime = new Date().getTime();
          this.totalAttentionTime += Math.round(
            (this.endAttentionTime - this.startAttentionTime) / 1000
          );
          clearTimeout(this.attentionTimeout);
          this.startAttentionTime = null;
        }
      }

      get() {
        //getter should restart attention capturing as endAttention updates the value:
        this.endAttention();
        this.startAttention();
        return this.totalAttentionTime;
      }

      addVideoEvents() {
        this.videoPlayers = document.getElementsByTagName("video");
        for (let i = 0; i < this.videoPlayers.length; i++) {
          this.videoPlayers[i].addEventListener("playing", (ev) =>
            this.startConstantAttention(ev)
          );
          this.videoPlayers[i].addEventListener("pause", (ev) =>
            this.endConstantAttention(ev)
          );
          this.videoPlayers[i].addEventListener("ended", (ev) =>
            this.endConstantAttention(ev)
          );
        }
      }

      handleVisibilityChange(ev) {
        if (ev.detail.hidden) {
          this.endAttention();
        } else {
          this.startAttention();
        }
      }
    }

    events.attention = new Attention();
    events.scrollDepthInit = (
      contextSource,
      { percentages = [25, 50, 75, 100], selector = "body" } = {}
    ) => {
      if (!(contextSource && contextSource.length)) {
        throw new Error("contextSource required");
      }

      const intersectionCallback = (observer, changes) => {
        changes.forEach((change) => {
          if (change.isIntersecting || change.intersectionRatio > 0) {
            const scrollDepthMarkerEl = change.target;
            fireBeacon(
              contextSource,
              scrollDepthMarkerEl.getAttribute("data-percentage")
            );
            if (scrollDepthMarkerEl.parentNode) {
              scrollDepthMarkerEl.parentNode.removeChild(scrollDepthMarkerEl);
            }
            observer.unobserve(scrollDepthMarkerEl);
          }
        });
      };

      customTracking();
      function oTrackinginit() {
        // oTracking
        var oTracking = Origami["o-tracking"];
        var parent = document.querySelector('meta[name="parent"]');

        var config_data = {
          server: "https://spoor-api.ft.com/px.gif",
          context: {
            product: "paid-post",
            content: {
              title: document.querySelector("title").textContent,
              parent: parent ? parent.getAttribute("content") : null,
            },
          },
          user: {
            ft_session: null,
          },
        };
        // Setup
        oTracking.init(config_data);
        // Automatically track clicks
        // oTracking.click.init("cta");
        // Page
        oTracking.page({
          content: {
            asset_type: "page",
          },
        });
      }

      // oTrackinginit();

      const element = document.querySelector(selector);
      if (element && window.IntersectionObserver) {
        const observer = new IntersectionObserver(function (changes) {
          intersectionCallback(this, changes);
        });
        percentages.forEach((percentage) => {
          // add a scroll depth marker element
          const targetEl = document.createElement("div");
          targetEl.className = "n-ui__scroll-depth-marker";
          targetEl.style.position = "absolute";
          targetEl.style.top = `${percentage}%`;
          targetEl.style.bottom = "0";
          targetEl.style.width = "100%";
          targetEl.style.zIndex = "-1";
          targetEl.setAttribute("data-percentage", percentage);
          element.appendChild(targetEl);
          observer.observe(targetEl);
        });
      }
    };

    const intervalId = setInterval(function () {
      if (window.Origami) {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        events.attention.init();
        events.scrollDepthInit("paid-post", { selector: ".main" });
      }
    }, 20);

    const timeoutId = setTimeout(function () {
      clearInterval(intervalId);
    }, 1000);
  }, [activeArticle]);

  function goHome() {
    history.push(`/`);
    setActiveArticle("/");
  }

  function handleURLChange(e) {
    e.preventDefault();
    const id = parseInt(e.target.dataset.ref);
    setActiveArticle(id);
    history.push(`#${id}`);
  }

  function toggleArticle(url) {}

  return (
    <ActiveContext.Provider
      value={[
        activeArticle,
        activeHero,
        setActiveArticle,
        handleURLChange,
        goHome,
      ]}
    >
      {props.children}
    </ActiveContext.Provider>
  );
};
