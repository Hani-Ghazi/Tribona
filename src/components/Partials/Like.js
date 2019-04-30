import React from "react";
import { FaRegHeart} from "react-icons/fa";

const Like = ({ isLike, onChange, size }) => {
  return <FaRegHeart size={size || "2em"} className="pointer" onClick={onChange}
                     color={!!isLike ? "#e40a22" : undefined}/>;
};

export default Like;