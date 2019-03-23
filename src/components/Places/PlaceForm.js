import React, { Component, Fragment } from "react";
import StaticSlider from "../sliders/StaticSlider";
import api from "../../api/utils";
import _ from "lodash";
import { CountryFilter, CityFilter, PlaceCategorySelect } from "../filters";
import { FaImages } from "react-icons/fa";
import { toast } from "react-toastify";
import { Images } from "../Partials";
import { connect } from "react-redux";
import { getPlacesCategories, createPlace, updatePlace, getPlaceById } from "../../actions/Places";
import { getCitiesByCountryId } from "../../actions/Country";
import { scrollToTop } from "../../utils";

import MarkerInput from "../Partials/MarkerInput";

class PlaceForm extends Component {
  state = {
    data: {
      images: [],
      name: "",
      description: "",
      latitude: 41.0111558,
      longitude: 29.0381558,
      countryId: "",
      cityId: "",
      categoryId: ""
    },
    loading: false,
    categories: [],
    cities: []
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      Promise.all([
        this.props.getPlaceById(id),
        this.props.getPlacesCategories()
      ]).then(res => {
        if (res[0].payload.countryId) {
          this.props.getCitiesByCountryId(res[0].payload.countryId)
            .then(cities => this.setState({ cities }));
        }
        this.setState({
          data: { ...res[0].payload },
          categories: res[1]
        }, scrollToTop);
      }).catch(e => {
        console.log(e);
        this.props.history.push("/");
      });
    } else {
      this.props.getPlacesCategories()
        .then(categories => this.setState({ categories }, scrollToTop));
    }
  }

  onUpload = (e) => {
    const data = new FormData();
    const types = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    const files = Array.from(e.target.files);
    let isValid = false;
    files.forEach(file => {
      if (types.indexOf(file.type) === -1) {
        toast.error("Image type not supported! Please try another one", {
          hideProgressBar: true
        });
      } else if (file.size > 1164642) {
        toast.error("You can't upload an image with size more than 10MB", {
          hideProgressBar: true
        });
      } else {
        isValid = true;
        data.append("files", file, file.name);
      }
    });
    if (isValid) {
      api.upload(data).then(images => {
        this.setState({
          data: {
            ...this.state.data,
            images: [...this.state.data.images, ...images.map(img => img.filename)]
          }
        });
      });
    }
  };

  onChange = e => {
    if (e.target.name === "countryId" && e.target.value) {
      this.props.getCitiesByCountryId(e.target.value)
        .then(cities => this.setState({ cities }));
    }
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: { ...this.state.errors, [e.target.name]: null }
    });
  };

  removeImage = image => {
    const { images } = this.state.data;
    this.setState({ data: { ...this.state.data, images: images.filter(img => img !== image) } });
  };

  onFilter = (value, key) => {
    if (key === "countryId") {
      if (value) {
        this.props.getCitiesByCountryId(value[value.valueKey])
          .then(cities => this.setState({ cities }));
      } else {
        this.setState({ cities: [], cityId: undefined });
      }

    }
    this.setState({
      data: { ...this.state.data, [key]: _.get(value, `${(value || {}).valueKey}`, undefined) },
      [key]: value,
      isUpdating: true
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { data } = this.state;
    const errors = this.validate(data);
    if (_.isEmpty(errors)) {
      const { createPlace, updatePlace } = this.props;
      (!!data.id ? updatePlace(data) : createPlace(data))
        .then(place => {
          toast.success("Place Saved Successfully", {
            hideProgressBar: true
          });
          this.props.history.push(`/places`);
        });
    } else {
      toast.error("Invalid form Please check the form's data again!", {
        hideProgressBar: true
      });
    }
  };

  validate = data => {
    return {};
  };

  onMarkerChange = (marker) => {
    this.setState({
      data: {
        ...this.state.data,
        latitude: marker.latitude,
        longitude: marker.longitude
      }
    });
  };

  render() {
    const { data, cities, categories, country, city, categoryId } = this.state;
    return (
      <Fragment>
        <StaticSlider curveImage={require("../../assets/svgs/curvegrey.svg")}/>
        <section id="pagesection">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12 order-md-first order-last">
                <div className="controls">
                  <h3>Place Form</h3>
                  <div className="form-group">
                    <label htmlFor="form_name p-l-10">Name</label>
                    <input id="form_name" type="text" name="name" className="form-control"
                           value={data.name} onChange={this.onChange}
                           placeholder="Please enter your first name *" required="required"/>
                    <div className="help-block with-errors tiny mt-2"/>
                  </div>
                  <div className="form-group pos-relative">
                    <label htmlFor="">Select Category</label>
                    <PlaceCategorySelect
                      onFilter={this.onFilter}
                      categories={categories}
                      value={categoryId}
                      categoryId={(data.category || {}).id}
                    />
                  </div>
                  <div className="form-group pos-relative">
                    <label htmlFor="">Select Country</label>
                    <CountryFilter onFilter={this.onFilter} value={country} geonameId={data.countryId}/>
                  </div>
                  <div className="form-group pos-relative">
                    <label htmlFor="">Select City</label>
                    <CityFilter cities={cities} onFilter={this.onFilter} geonameId={data.cityId} value={city}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="form_message p-l-10">Description</label>
                    <textarea id="form_message" name="description" className="form-control" value={data.description}
                              onChange={this.onChange}
                              placeholder="Place Description" rows="10" required="required"/>
                    <div className="help-block with-errors tiny mt-2"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="form_message p-l-10">Map</label>
                    <div className="row m-t-10 m-b-10">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="form_message p-l-10">latitude</label>
                          <input type="text" name="latitude" className="form-control"
                                 value={data.latitude} readOnly placeholder="latitude"/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="form_message p-l-10">longitude</label>
                          <input type="text" name="name" className="form-control"
                                 value={data.longitude} readOnly placeholder="longitude"/>
                        </div>
                      </div>
                    </div>
                    <MarkerInput marker={{ longitude: data.longitude, latitude: data.latitude }}
                                 onChange={this.onMarkerChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="multi">
                      Images <FaImages size="2em" className="pointer"/>
                      <small className="m-l-10">(Please click the icon to add more)</small>
                    </label>
                    <input type='file' id='multi' onChange={this.onUpload} multiple className="hidden"/>
                  </div>
                  <div className="form-group">
                    <Images images={data.images} removeImage={this.removeImage}/>
                  </div>
                  <div className="row">
                    <div className={"col-md-3 offset-9 p-0"}>
                      <button type="submit" className="btn my-2 btn-primary mb-lg-0 mb-4 w-100"
                              onClick={this.onSubmit}>Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

const initMapStateToProps = state => {
  return {
    countries: state.countries,
    place: state.places.place
  };
};

export default connect(initMapStateToProps, {
  getPlacesCategories,
  getCitiesByCountryId,
  createPlace,
  updatePlace,
  getPlaceById
})(PlaceForm);