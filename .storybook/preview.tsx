import type { Preview } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { MockRemixRouterProvider, useRemixRouter } from "./mockRouter";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      console.log("decorator");
      return (
        <MockRemixRouterProvider>
          <Story />
        </MockRemixRouterProvider>
      );
    },
  ],
  // decorators: [
  //   (Story) => {
  //     const Stub = createRemixStub([
  //       {
  //         path: "/",
  //         action: () => ({ redirect: "/stfu" }),
  //         loader: () => ({ redirect: "/stfu" }),
  //         Component: Story,
  //       },
  //     ]);
  //
  //     return <Stub />;
  //   },
  // ],
  // decorators: [
  //   (Story) => {
  //     return (
  //       <MemoryRouter initialEntries={["/"]}>
  //         <Story />
  //       </MemoryRouter>
  //     );
  //   },
  // ],
};

export default preview;
