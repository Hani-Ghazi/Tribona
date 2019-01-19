import React, { Fragment } from "react";
import { IoIosChatbubbles } from "react-icons/io";

const CommentsCount = ({ count }) => (
  <Fragment>
    {count} <IoIosChatbubbles/>
  </Fragment>
);

export default CommentsCount;