import React from "react";
import {IoIosThumbsUp } from "react-icons/io";

const Like = ({ isLike, onChange, size }) => {
  return <IoIosThumbsUp size={size || '2em'} className="pointer" onClick={onChange} color={!!isLike? "#ff4f81": undefined}/>;
};

export default Like;