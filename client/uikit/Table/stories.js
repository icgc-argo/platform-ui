import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";
import React from "react";

import Table from ".";
import readme from "./readme.md";

const TableStories = storiesOf(`${__dirname}`, module).add(
  "Basic",
  () => {
    const knobs = {
      sortable: boolean("sortable", true),
      loading: boolean("loading", false),
      showPagination: boolean("showPagination", false),
      showPaginationTop: boolean("showPaginationTop", false),
      showPaginationBottom: boolean("showPaginationBottom", false)
    };
    return (
      <Table
        {...knobs}
        data={[
          { prop1: 1, prop2: 5, prop3: "some text 1" },
          { prop1: 2, prop2: 4, prop3: "some text 2" },
          { prop1: 3, prop2: 3, prop3: "some text 3" },
          { prop1: 4, prop2: 2, prop3: "some text 4" },
          { prop1: 5, prop2: 1, prop3: "some text 5" }
        ]}
        columns={[
          {
            sortable: false,
            Header: "Property 1",
            accessor: "prop1"
          },
          {
            Header: "Property 2",
            accessor: "prop2"
          },
          {
            Header: "Property 3",
            accessor: "prop3"
          }
        ]}
      />
    );
  },
  { info: { text: readme } }
);

export default TableStories;
