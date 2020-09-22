import React from "react";
import { BxColorBlack } from "bx-tokens/js/bx_es_variables";
import DecorativeLink from "./DecorativeLink.js";

export default {
  title: "DecorativeLink",
  component: DecorativeLink,
  argTypes: {
    id: { control: "text" },
    lineColor: { control: "text" },
    opacity: { control: "number" },
    href: { control: "text" },
    action: { control: "boolean" },
    children: { control: "data" },
  },
};

const Template = (args) => <DecorativeLink {...args} />;

export const Text = Template.bind({});
Text.args = {
  id: "",
  lineColor: BxColorBlack,
  opacity: 0.5,
  href: "https://www.bixal.com",
  children: "This is a link",
};

const ReactElement = () => {
  return (
    <a href="https://www.goggle.com">
      <span>This is an element</span>
    </a>
  );
};

export const Element = Template.bind({});
Element.args = {
  id: "react-element",
  lineColor: "#123456",
  opacity: 1,
  children: (
    <ReactElement />
  ),
};

