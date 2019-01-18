import React from "react";
import { IoIosHeart } from "react-icons/io";

const Favorite = ({ isFav, onChange }) => {
  return <IoIosHeart size="2em" className="pointer" onClick={onChange} color={isFav? "#ff4f81": ''}/>;
};

export default Favorite;