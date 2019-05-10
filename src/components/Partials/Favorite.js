import React from "react";
import { FaRegBookmark } from "react-icons/fa";

const Favorite = ({ isFav, onChange, size }) => {
  return <FaRegBookmark size={size || "2em"} className="pointer" onClick={onChange}
                        color={isFav ? "#1a6bc4" : undefined}/>;
};

export default Favorite;