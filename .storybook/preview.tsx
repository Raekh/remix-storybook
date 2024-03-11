import type { Preview } from "@storybook/react";
import "../app/tailwind.css";
import "../app/components/users/userCardWithoutTailwind.css";
import { createRemixStub } from "@remix-run/testing";
import React from "react";

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
      const RemixStub = createRemixStub([
        {
          path: "/",
          Component: Story,
        },
      ]);

      return <RemixStub />;
    },
  ],
};

export default preview;
