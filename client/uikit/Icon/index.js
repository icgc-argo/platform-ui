import React from "react";
import PropTypes from "prop-types";
import Icons from "./icons";
import { css } from "@emotion/core";

const Icon = ({ name, width, height, fill }) => {
  const svg = Icons[name];

  return (
    <svg
      css={css`
        ${svg.css};
        height: ${height};
        width: ${width};
      `}
      width={width}
      height={height}
      viewBox={svg.viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title lang="en">{svg.title}</title>
      <g>
        <path fill={fill} fillRule={svg.fillRule || "nonezero"} d={svg.path} />
      </g>
    </svg>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string
};

export default Icon;
