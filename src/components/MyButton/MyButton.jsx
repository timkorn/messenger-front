import s from "./MyButton.module.scss";
import cn from "classnames";
import React from "react";
import PropTypes from "prop-types";
const MyButton = ({
  src,
  transitions = true,
  handleClick,
  className,
  alt,
  ...props
}) => {
  return (
    <button className={cn(s.root, className)} onClick={handleClick} {...props}>
      <img src={src} alt={alt} />
    </button>
  );
};
MyButton.propTypes = {
  transitions: PropTypes.bool,
  handleClick: PropTypes.func,
  src: PropTypes.node,
  className: PropTypes.string,
  alt: PropTypes.string,
};
export default MyButton;
