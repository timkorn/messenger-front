import s from "./MyTextButton.module.scss";
import cn from "classnames";
import React from "react";
import PropTypes from "prop-types";
const MyButton = ({ handleClick, className, children }) => {
  return (
    <button className={cn(s.root, className)} onClick={handleClick}>
      <p>{children}</p>
    </button>
  );
};
MyButton.propTypes = {
  handleClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};
export default MyButton;
