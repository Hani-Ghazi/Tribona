import React from "react";
import { GridLoader } from "react-spinners";

const pageLoader = ({ height = "70vh", bg = 'white-bg'}) => (
  <div className={`d-flex justify-content-center align-items-center loader-overlay ${bg}`} style={{ height }}>
    <div className='sweet-loading'>
      <GridLoader
        sizeUnit={"px"}
        size={20}
        color={"#ff4f81"}
        loading
      />
    </div>
  </div>
);

export default pageLoader;