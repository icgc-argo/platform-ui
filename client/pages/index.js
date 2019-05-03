// @flow
import React from "react";
import Root from "../components/Root";
import { createPage } from "global/utils/pages";

export default createPage({
  isPublic: true,
  getInitialProps: Root.getInitialProps
})(props => <Root {...props} />);
