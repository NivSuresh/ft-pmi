import React from "react";
import { SharingProvider } from "./SharingContext";
import { ActiveProvider } from "./ActiveContext";

const Provider = (props) => {
  return (
    <ActiveProvider>
      <SharingProvider>{props.children}</SharingProvider>
    </ActiveProvider>
  );
};

export default Provider;
