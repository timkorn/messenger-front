import MoonLoader from "react-spinners/MoonLoader";
import React from "react";
import { css } from "@emotion/react";

function UniversalLoader(props) {
  const override = css`
    position: absolute;
    top: calc(50% - ${(props.size * 1.22) / 2}px);
    left: calc(50% - ${(props.size * 1.22) / 2}px);
    border-color: red;
  `;
  return <MoonLoader css={override} size={props.size} />;
}
export default UniversalLoader;
