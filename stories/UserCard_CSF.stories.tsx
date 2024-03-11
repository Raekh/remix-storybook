import { createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import UserCard from "~/components/users/UserCard";

const meta = {
  title: "Components/UserCard2_CSF",
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

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoLink: Story = {
  args: {
    noLink: true,
  },
};

export const NoUser: Story = {
  args: {
    // eslint-disable-next-line
    user: null as any,
  },
};
