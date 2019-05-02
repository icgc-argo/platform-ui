import Root from "../components/Root";
import { withPathConfigValidation } from "./_app";

const Page = withPathConfigValidation(Root);

Page.isPublic = true;

export default Page;
