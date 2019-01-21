import React from "react";
import {IoIosThumbsUp } from "react-icons/io";

const Like = ({ isLike, onChange }) => {
  return <IoIosThumbsUp size="2em" className="pointer" onClick={onChange} color={!!isLike? "#ff4f81": undefined}/>;
};

export default Like;