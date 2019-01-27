import React from "react";
import { IoIosHeart, IoIosThumbsUp } from "react-icons/io";

const Favorite = ({ isFav, onChange, size}) => {
  return <IoIosHeart size={size || '2em'}  className="pointer" onClick={onChange} color={isFav ? "#ff4f81" : undefined}/>;
};

export default Favorite;