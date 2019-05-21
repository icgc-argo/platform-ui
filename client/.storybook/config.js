import { configure, addDecorator, addParameters } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import ReactTable from "react-table";
import "react-table/react-table.css";
import React from "react";

// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addParameters({
  options: {
    addonPanelInRight: true
  }
});
addDecorator(
  (() => {
    const TableComponent = ({ propDefinitions }) => (
      <ReactTable
        minRows={0}
        showPagination={false}
        data={propDefinitions}
        columns={[
          { Header: "property", accessor: "property" },
          {
            Header: "type",
            accessor: "propType",
            Cell: ({ original }) =>
              !original.propType ? null : (
                <React.Fragment>
                  {original.propType.name}
                  {original.propType.name === "enum" && (
                    <div>
                      {original.propType.value.map(({ value }) => (
                        <div>- {value}</div>
                      ))}{" "}
                    </div>
                  )}
                </React.Fragment>
              )
          },
          {
            Header: "required",
            accessor: "required",
            Cell: ({ original }) =>
              original.required ? (
                <React.Fragment>{String(original.required)}</React.Fragment>
              ) : null
          },
          {
            Header: "description",
            accessor: "description",
            style: { "white-space": "unset" }
          },
          {
            Header: "default value",
            accessor: "defaultValue",
            style: { "white-space": "unset" },
            Cell: ({ original }) => {
              return (
                <React.Fragment>{String(original.defaultValue)}</React.Fragment>
              );
            }
          }
        ]}
      />
    );
    return withInfo({ inline: true, header: false, TableComponent });
  })()
);
addDecorator(withKnobs);

configure(loadStories, module);
