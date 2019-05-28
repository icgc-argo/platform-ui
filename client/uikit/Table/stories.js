import { storiesOf } from "@storybook/react";
import React from "react";
import Table from ".";
import { boolean } from "@storybook/addon-knobs";

const TableStories = storiesOf(`${__dirname}`, module).add("Basic", () => {
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
        { prop1: 1, prop2: 2, prop3: "some text" },
        { prop1: 2, prop2: 3, prop3: "some text" },
        { prop1: 3, prop2: 3, prop3: "some text" },
        { prop1: 3, prop2: 3, prop3: "some text" },
        { prop1: 3, prop2: 3, prop3: "some text" }
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
});

export default TableStories;
