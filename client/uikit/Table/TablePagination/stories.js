import { storiesOf } from "@storybook/react";
import React from "react";
import TablePagination from ".";

const TablePaginationStories = storiesOf(`${__dirname}`, module).add(
  "Basic",
  () => <TablePagination>Skeleton</TablePagination>
);

export default TablePaginationStories;
