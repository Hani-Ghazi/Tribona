import React from "react";
import Loadable from "react-loadable";
import { PropagateLoader } from "react-spinners";
import placesApi from "../../api/places";
import utilsApi from "../../api/utils";

export const HomePage = Loadable.Map({
  loader: {
    HomePage: () => import("../pages/HomePage"),
    places: () => placesApi.getPlaces(),
    countries: () => utilsApi.getCountries()
  },
  loading: () => <PropagateLoader/>,
  render(loaded, props) {
    let HomePage = loaded.HomePage.default;
    return <HomePage {...props} places={loaded.places} countries={loaded.countries}/>;
  }
});