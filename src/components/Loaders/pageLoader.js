import React from "react";
import { GridLoader } from "react-spinners";

const pageLoader = () => (
  <div className={`d-flex justify-content-center align-items-center loader-overlay page-loader `}>
    <div className='sweet-loading'>
      <GridLoader
        sizeUnit={"px"}
        size={20}
        color={"#e40a22"}
        loading
      />
    </div>
  </div>
);

export default pageLoader;