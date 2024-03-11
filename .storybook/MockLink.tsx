import React, { PropsWithChildren } from "react";

const MockLink = ({ to, children, ...props }: PropsWithChildren<any>) => {
  return (
    <a href={to} {...props}>
      {children}
    </a>
  );
};

export default MockLink;
