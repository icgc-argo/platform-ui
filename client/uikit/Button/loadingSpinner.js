import React from "react";
import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/core";
import Icon from "../Icon";

const loader = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  />
);

const spin = keyframes`

  100% {
    transform: rotate(360deg);
  }

`;

console.log("spin", spin);
const SVG = styled(Icon)`
  animation: ${spin} 1.4s linear infinite;
  width: 40px;
  height: 40px;
`;

export default ({ width, height, fill }) => (
  <div>
    <Icon name="spinner" width={"40px"} height={"40px"} />
    <span
      className={css`
        background-color: red;
        color: blue;
      `}
    >
      lol
    </span>
  </div>
);
