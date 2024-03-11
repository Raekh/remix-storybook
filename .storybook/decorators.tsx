import React from "react";
import { BrowserRouter } from "react-router-dom";

export const RemixMockProvider = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
