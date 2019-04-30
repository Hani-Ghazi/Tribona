import React from "react";
import { FaRegBookmark } from "react-icons/fa";

const Favorite = ({ isFav, onChange, size }) => {
  return <FaRegBookmark size={size || "2em"} className="pointer" onClick={onChange}
                        color={isFav ? "#e40a22" : undefined}/>;
};

export default Favorite;