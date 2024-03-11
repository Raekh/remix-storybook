import { Meta, StoryObj } from "@storybook/react";
import "../styles/global.css";
import RequestCard from "../app/components/requests/RequestCard";
import { createRemixStub } from "@remix-run/testing";
import { MemoryRouter, RouterProvider, createMemoryRouter } from "react-router";

export default {
  title: "Components/RequestCard_noCSF",
  component: RequestCard,
  args: {
    request: {
      id: "1",
      title: "Test",
      status: "OPEN",
      projectId: "2",
      createdAt: new Date("2021-01-01T00:00:00.000Z"),
      updatedAt: new Date("2021-01-01T00:00:00.000Z"),
    },
  },
  decorators: [
    (Story) => {
      const router = createMemoryRouter([
        {
          path: "/",
          Component: Story,
        },
      ]);

      return <RouterProvider router={router} />;
    },
  ],
} satisfies Meta<typeof RequestCard>;

export const Default = {
  name: "Default",
} satisfies StoryObj<typeof RequestCard>;

export const NoLink = {
  name: "NoLink",
  args: {
    noLink: true,
  },
} satisfies StoryObj<typeof RequestCard>;

export const NoRequest = {
  name: "NoRequest",
  args: {
    // eslint-disable-next-line
    request: null as any,
  },
} satisfies StoryObj<typeof RequestCard>;
