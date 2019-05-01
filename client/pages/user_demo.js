import React from "react";
import { get } from "lodash";
import jwtDecode from "jwt-decode";

const Page = ({ egoJwt, firstName, lastName }) => {
  return (
    <div>
      Logged in user: {firstName} {lastName}
    </div>
  );
};

Page.getInitialProps = ({ egoJwt, asPath, query, res }) => {
  try {
    const data = jwtDecode(egoJwt);
    const firstName = get(data, "context.user.firstName", "");
    const lastName = get(data, "context.user.lastName", "");
    return { firstName, lastName };
  } catch (err) {
    res.redirect(`/login?redirect=${encodeURI(asPath)}`);
    console.log("error!");
  }
};

Page.canBeAccessed = ({ egoJwt, ctx }) => {
  try {
    jwtDecode(egoJwt);
    return true;
  } catch {
    return false;
  }
};

export default Page;
