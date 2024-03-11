import type { Meta, StoryObj } from "@storybook/react";
import RequestCard from "~/components/requests/RequestCard";
import { Page } from "./Page";

const meta = {
  title: "Components/RequestCard2_CSF",
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
    /* remix stub */
    // (Story) => {
    //   const RemixStub = createRemixStub([
    //     {
    //       path: "/",
    //       /* eslint-disable-next-line */
    //       Component: Story,
    //     },
    //   ]);
    //
    //   return <RemixStub />;
    // },
  ],
} satisfies Meta<typeof RequestCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoLink: Story = {
  args: {
    noLink: true,
  },
};

export const NoRequest: Story = {
  args: {
    // eslint-disable-next-line
    request: null as any,
  },
};
