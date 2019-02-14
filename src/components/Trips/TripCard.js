import React from "react";

const TripCard = ({ trip }) => (
  <div className="card m-b-30">
    <small className="white front">
      <span className="far fa-clock mr-2 white"/>
      <strong>9</strong> <br/>days
    </small>
    <a className="img-card" href="#">
      <img src={require("../../assets/images/switzerland.jpg")} alt=""/>
    </a>
    <div className="card-content">
      <div>
        <a className="btn btn-primary px-3 btn-sm float-left" href="#" role="button">adventure</a>
      </div>
      <h6 className="primary-color text-right">$3300</h6>
      <h6 className="black"><a href="#" target="_blank">Great Switzerland</a></h6>
      <p className="">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id ligula aliquam, malesuada ex ac, auctor
        nibh. Nunc <a href="#" target="_blank"><span>... See more</span></a>
      </p>
    </div>
  </div>
);

export default TripCard;