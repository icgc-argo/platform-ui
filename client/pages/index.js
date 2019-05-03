import Root from "../components/Root";
import { createPage } from "./_app";

export default createPage({
  isPublic: true,
  getInitialProps: Root.getInitialProps
})(props => <Root {...props} />);
