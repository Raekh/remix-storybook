import React, { createContext } from "react";

const RouterContext = createContext<any>({});

export function MockRemixRouterProvider({ children }) {
  const contextValue = {};

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRemixRouter() {
  return React.useContext(RouterContext);
}
