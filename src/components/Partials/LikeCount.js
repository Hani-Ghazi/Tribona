import React, { Fragment } from "react";
import {IoIosThumbsUp } from "react-icons/io";

const LikeCount = ({ count }) => (
  <Fragment>
    {count} <IoIosThumbsUp/>
  </Fragment>
);

export default LikeCount;