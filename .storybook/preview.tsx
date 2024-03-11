import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // decorators: [
  /* MockRemixRouterProvider */
  //   (Story) => {
  //     console.log("decorator");
  //     return (
  //       <MockRemixRouterProvider>
  //         <Story />
  //       </MockRemixRouterProvider>
  //     );
  //   },
  /* createRemixStub */
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
  /* MemoryRouter */
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
