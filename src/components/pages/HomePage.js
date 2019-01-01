import React, {Fragment} from 'react';
import StaticSlider from '../sliders/StaticSlider';
import HorizontalFilters from '../filters/HorizontalFilters';
import PopularTrips from '../partials/PopularTrips';
import PopularPlaces from '../partials/PopularPlaces';

const trips = [{
  img: require('../../assets/images/costarica.jpg'),
  title: 'Costa Rica'
}, {
  img: require('../../assets/images/costarica.jpg'),
  title: 'Costa Rica'
}, {
  img: require('../../assets/images/costarica.jpg'),
  title: 'Costa Rica'
}, {
  img: require('../../assets/images/costarica.jpg'),
  title: 'Costa Rica'
}];

const HomePage = () => (
  <Fragment>
    <StaticSlider curveImage={require("../../assets/svgs/curve.svg")}/>
    <HorizontalFilters/>
    <PopularTrips trips={trips}/>
    <PopularPlaces places={trips}/>
  </Fragment>
);

export default HomePage;