import React from "react";
import { storiesOf } from "@storybook/react";
import { radios, select, boolean } from "@storybook/addon-knobs";
import defaultTheme from "../theme/defaultTheme";

import Typography from ".";

const TypographyStories = storiesOf(`${__dirname}`, module)
  .add("Basic", () => {
    const knobs = {
      variant: radios("variant", Object.keys(defaultTheme.typography), "hero"),
      component: select(
        "tag",
        [null, "h1", "h2", "h3", "h4", "h5", "div", "span", "p"],
        null
      ),
      bold: boolean("bold", false),
      color: select(
        "color",
        [null, "#00f", ...Object.keys(defaultTheme.colors)],
        null
      )
    };
    return <Typography {...knobs}>Skeleton</Typography>;
  })
  .add("List", () => (
    <>
      {Object.entries(defaultTheme.typography).map(([key]) => (
        <div key={key}>
          <Typography variant={key}>{key}</Typography>
        </div>
      ))}
    </>
  ));

export default TypographyStories;
