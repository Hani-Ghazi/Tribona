import React from 'react';
import PlaceCard from './PlaceCard';


const PopularPlaces = ({places}) => (
  <section id="section4">
    <img className="curve3" src={require("../../assets/svgs/curve2.svg")} alt=""/>

    <div className="content tours-homepage">
      <div className="container">
        <div className="text-center">
          <h3 className="black front bold text-center">Popular Tours to discover</h3>
          <div className="separator text-center svgcenter"/>
          <h5 className="primary-color text-center mb-5">Occaecat sunt elit quis id commodo ullamco dolor fugiat
            ullamco culpa </h5>
        </div>
        <div className="row ">
          {
            places.map(place => (
              <PlaceCard place={place}/>
            ))
          }
        </div>
      </div>
    </div>
  </section>
);

export default PopularPlaces;