import { createRemixStub } from "@remix-run/testing";
import { Meta, StoryObj } from "@storybook/react";
import UserCard from "~/components/users/UserCard";
import "../styles/global.css";

export default {
  title: "Components/UserCard_noCSF",
  component: UserCard,
  args: {
    user: {
      id: "1",
      username: "John",
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u", // twixrox

      createdAt: new Date("2021-01-01T00:00:00.000Z"),
      updatedAt: new Date("2021-01-01T00:00:00.000Z"),
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
} satisfies Meta<typeof UserCard>;

export const Default = {
  name: "Default",
} satisfies StoryObj<typeof UserCard>;

export const NoLink = {
  name: "NoLink",
  args: {
    noLink: true,
  },
} satisfies StoryObj<typeof UserCard>;

export const NoUser = {
  name: "NoUser",
  args: {
    // eslint-disable-next-line
    user: null as any,
  },
} satisfies StoryObj<typeof UserCard>;
