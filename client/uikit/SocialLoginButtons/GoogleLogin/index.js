import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

/**
 * Social login for Google
 */
const StyledLink = styled("a")`
  font-size: 30px;
`;

const GoogleLogin = ({ link }) => (
  <StyledLink id="google-log-in" href={link}>
    Log in with the Google
  </StyledLink>
);

GoogleLogin.propTypes = { link: PropTypes.string.isRequired };

export default GoogleLogin;
