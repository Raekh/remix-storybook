import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Button from "../app/atoms/Button";
import "../styles/global.css";

const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Click",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Inverse: Story = {
  args: {
    ...Default.args,
    mode: "inverse",
  },
};

export const Other: Story = {
  args: {
    ...Default.args,
    mode: "inverse",
    // fill: true,
    styles: { backgroundColor: "#f35" },
  },
};
