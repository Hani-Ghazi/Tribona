import React from "react";
import { scrollToTop } from "../../utils";

const BackToTop = () => (
  <button onClick={() => scrollToTop()} id="back-to-top" title="Go to top"/>
);

export default BackToTop;