import React from "react";
import { Link } from "react-router-dom";

const { REACT_APP_PUBLIC_FILES } = process.env;

const PopularAside = ({ list, action }) =>
  (list || [])
    .filter(img => img.images.length)
    .map((item, key) =>
      <Link
        to={`${item.id}`}
        key={key} className="pointer" onClick={() => action(item.id)}>
        <img src={REACT_APP_PUBLIC_FILES + item.images[0]} alt="" className="popular-images"/>
      </Link>
    );

export default PopularAside;