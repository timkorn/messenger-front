import s from "./MyTextButton.module.scss";
import cn from "classnames";
import React from "react";
import PropTypes from "prop-types";
const MyButton = ({ handleClick, className, children, image = null }) => {
  return (
    <button
      className={cn(s.root, className, image && s.im)}
      onClick={handleClick}
    >
      {image && <img src={image} />}

      <p>{children}</p>
    </button>
  );
};
MyButton.propTypes = {
  handleClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
  image: PropTypes.node,
};
export default MyButton;
