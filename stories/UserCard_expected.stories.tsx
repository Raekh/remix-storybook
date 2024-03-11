import type { Meta, StoryObj } from "@storybook/react";
import UserCardWithoutTailwind from "~/components/users/UserCardWithoutTailwind";

const meta = {
  title: "Components/Expected",
  component: UserCardWithoutTailwind,
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
} satisfies Meta<typeof UserCardWithoutTailwind>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
