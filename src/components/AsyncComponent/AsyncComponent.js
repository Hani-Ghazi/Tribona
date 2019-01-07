import React from 'react';
import Loadable from 'react-loadable';
import {PropagateLoader} from 'react-spinners'
import placesApi from '../../api/places';
import tripsApi from '../../api/trips';

export const HomePage = Loadable.Map({
  loader: {
    HomePage: () => import("../pages/HomePage"),
    places: () => placesApi.getPlaces(),
    // trips: () => tripsApi.getTrips(),

  },
  loading: () => <PropagateLoader/>,
  render(loaded, props) {
    let HomePage = loaded.HomePage.default;
    return <HomePage {...props} places={loaded.places}/>
  }
});