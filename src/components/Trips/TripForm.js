import React, { Component, Fragment } from "react";
import StaticSlider from "../sliders/StaticSlider";
import DatePicker from "react-datepicker";
import { FaImages } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../api/utils";
import PropTypes from "prop-types";
import Modal from "react-responsive-modal";
import _ from "lodash";
import placesAPI from "../../api/places";
import TripAPI from "../../api/trips";

import {
  createTrip,
  updateTrip,
  getTripById,
  getTripSteps,
  deleteStep,
  createStep,
  updateStep
} from "../../actions/Trips";
import { Images } from "../Partials";
import { connect } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { TripTypeSelector, PlaceSelector } from "../filters";
import { TripFeaturesSelector } from "../filters";
import { PageLoader, ActionLoader } from "../Loaders";

const { trips: { types } } = require("../../constants");


class TripForm extends Component {
  state = {
    data: {
      images: [],
      name: "",
      description: "",
      duration: 0,
      startDate: new Date(),
      features: [],
      steps: []
    },
    places: [],
    isOpen: false,
    newStep: {},
    steps: [],
    isLoading: true,
    isUpdating: false
  };

  componentDidMount() {
    if (!!this.props.match.params.id) {
      const id = this.props.match.params.id;
      const { getTripById, getTripSteps } = this.props;
      Promise.all([
        getTripById(id),
        getTripSteps(id),
        placesAPI.getPlaces(),
        TripAPI.getFeatures()
      ])
        .then(temp => {
          this.setState({
            data: { ...temp[0].payload },
            steps: temp[1],
            places: temp[2],
            featuresOptions: temp[3],
            isLoading: false
          });
        });
    } else {
      Promise.all([
        placesAPI.getPlaces(),
        TripAPI.getFeatures()
      ]).then(res => {
        this.setState({
          places: res[0],
          featuresOptions: res[1],
          isLoading: false
        });
      });
    }
  }

  onUpload = (e, key = "data") => {
    const data = new FormData();
    const types = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    const files = Array.from(e.target.files);
    let isValid = false;
    this.setState({ isUpdating: true });
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
          [key]: {
            ...this.state[key],
            images: [...this.state[key].images, ...images.map(img => img.filename)]
          },
          isUpdating: false
        });
      });
    }
  };

  onChange = (e, key = "data") => {
    this.setState({
      [key]: { ...this.state[key], [e.target.name]: e.target.value },
      errors: { ...this.state.errors, [e.target.name]: null }
    });
  };

  removeImage = (image, key = "data") => {
    const { images } = this.state[key];
    this.setState({ [key]: { ...this.state[key], images: images.filter(img => img !== image) } });
  };

  onDeleteStep = e => {
    e.preventDefault();
    const { data, newStep: { id } } = this.state;
    this.props.deleteStep(id)
      .then(() => {
        toast.success("Trip Step deleted Successfully", {
          hideProgressBar: true
        });
        this.setState({ isOpen: false, data: { ...data, steps: data.steps.filter(x => x.id !== id) }, newStep: {} });
      });
  };

  onSubmit = e => {
    e.preventDefault();
    const { data, features } = this.state;
    const errors = this.validate(data);
    if (_.isEmpty(errors)) {
      data.features = features.map(x => x.id);
      data.duration = parseInt(data.duration || 0, 10);
      const { createTrip, updateStep } = this.props;
      (!!data.id ? updateStep(data) : createTrip(data))
        .then(trip => {
          toast.success("Trip Saved Successfully", {
            hideProgressBar: true
          });
          this.setState({ data: { ...this.state.data, ...trip } });
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

  onSelectStep = (selectedOptions, key) => {
    this.setState({
      newStep: { ...this.state.newStep, [key]: selectedOptions.value }
    });
  };

  onChangeStep = e => {
    this.setState({
      newStep: { ...this.state.newStep, [e.target.name]: e.target.value }
    });
  };

  onSaveStep = e => {
    e.preventDefault();
    const { newStep } = this.state;
    const { createStep, updateStep } = this.props;
    const temp = { ...newStep, placeId: newStep.placeId || newStep.place.id };
    (newStep.id ? updateStep(temp) : createStep(temp))
      .then(step => {
        toast.success("Trip Step Saved Successfully", {
          hideProgressBar: true
        });
        if (!!newStep.id) {
          this.setState({
            isOpen: false,
            data: { ...this.state.data, steps: this.state.data.steps.map(x => x.id === newStep.id ? step : x) },
            newStep: {}
          });
        } else {
          this.setState({
            isOpen: false,
            data: { ...this.state.data, steps: [...this.state.data.steps, step] },
            newStep: {}
          });
        }

      });
  };

  onFilter = (value, key) => {
    this.setState({
      data: { ...this.state.data, [key]: _.get(value, `${(value || {}).valueKey}`, undefined) },
      [key]: value
    });
  };

  renderStartDate = () =>
    <div className="form-group">
      <label>Start Date</label>
      <DatePicker
        className="form-control"
        selected={this.state.data.startDate}
        onChange={(date) => this.setState({ data: { ...this.state.data, startDate: date } })}
      />
    </div>;

  renderDuration = () =>
    <div className="form-group">
      <label>Duration <strong>(in days)</strong></label>
      <input type="number" name="duration" className="form-control"
             value={this.state.data.duration} onChange={this.onChange}
             placeholder="Please enter the trip duration*" required="required"/>
    </div>;


  render() {
    const { data, newStep, isUpdating, isOpen, places, isLoading, type, featuresOptions, features } = this.state;
    return (
      <Fragment>
        <StaticSlider curveImage={require("../../assets/svgs/curvegrey.svg")}/>
        {
          isLoading && <PageLoader/>
        }
        {
          !isLoading &&
          <section id="pagesection">
            {
              isUpdating && <ActionLoader/>
            }
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-12 order-md-first order-last">
                  <div className="controls">
                    <h3 className="p-b-20">Trip Form</h3>
                    <div className="form-group">
                      <label>Name</label>
                      <input id="form_name" type="text" name="name" className="form-control"
                             value={data.name} onChange={this.onChange}
                             placeholder="Please enter your first name *" required="required"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="form_name p-l-10">Type</label>
                      <TripTypeSelector value={type} type={data.type} onFilter={this.onFilter}/>
                    </div>
                    {
                      data.type === types.GROUP_ONETIME && [this.renderStartDate(), this.renderDuration()]
                    }
                    {
                      data.type === types.GROUP_PERIODIC && this.renderDuration()
                    }
                    <div>

                    </div>
                    <div className="form-group">
                      <label>Capacity</label>
                      <input type="number" name="capacity" className="form-control"
                             value={data.capacity} onChange={this.onChange}
                             placeholder="Please enter the trip capacity*" required="required"/>
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input type="number" name="price" className="form-control"
                             value={data.price} onChange={this.onChange}
                             placeholder="Please enter the trip price*" required="required"/>
                    </div>
                    <div className="form-group">
                      <label>Features</label>
                      <TripFeaturesSelector
                        features={featuresOptions}
                        value={features}
                        onFilter={this.onFilter}
                        selectedFeatures={data.features}/>
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea name="description" className="form-control" value={data.description}
                                onChange={this.onChange}
                                placeholder="Place Description" rows="4" required="required"/>
                      <div className="help-block with-errors tiny mt-2"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="multi">
                        Images <FaImages size="1.5em" className="pointer"/>
                        <small className="m-l-10">(Please click the icon to add more)</small>
                      </label>
                      <input type='file' id='multi' onChange={this.onUpload} multiple className="hidden"/>
                    </div>
                    <div className="form-group">
                      <Images images={data.images} removeImage={this.removeImage}/>
                    </div>
                    {
                      <Fragment>
                        <hr/>
                        <div className={"w-100 text-center"}>
                          <ul className={"steps"}>
                            {
                              data.steps
                                .map((step, currentIndex) =>
                                  <li
                                    key={currentIndex}
                                    onClick={() => this.setState({
                                      currentIndex,
                                      newStep: { ...step, tripId: data.id },
                                      isOpen: true
                                    })}
                                    className={`pointer ${currentIndex === this.state.currentIndex && "active"}`}>{currentIndex + 1}</li>
                                )
                            }
                          </ul>
                        </div>
                        {data.id &&
                        <div className="form-group">
                          <label> Steps
                            <FaPlus
                              size="1.5em" className={"pointer"}
                              onClick={() => this.setState({
                                newStep: { tripId: data.id, images: [] },
                                isOpen: true
                              })}/>
                          </label>
                        </div>
                        }
                        <Modal classNames={{ modal: "rounded-modal badge-light" }} open={isOpen}
                               onClose={() => this.setState({ isOpen: false, currentIndex: null })} center>
                          <div className="row">
                            <div className="col-md-6 col-sm-12 col-xs-12"
                                 style={{ borderRight: "1px solid darkgray" }}>
                              <h3 className="text-left">Step form</h3>
                              <form>
                                <div className="form-group">
                                  <PlaceSelector
                                    places={places}
                                    value={this.state.place}
                                    placeId={newStep.place}
                                    onFilter={(value, key) =>
                                      this.setState({
                                        newStep: {
                                          ...this.state.newStep,
                                          [key]: value[key],
                                          place: value
                                        }
                                      })
                                    }
                                  />
                                </div>
                                <div className="form-group text-left">
                                  <label htmlFor="form_message_step">Description</label>
                                  <textarea id="form_message_step" name="description" className="form-control"
                                            value={newStep.description}
                                            onChange={this.onChangeStep}
                                            placeholder="Place Description" rows="4" required="required"/>
                                  <div className="help-block with-errors tiny mt-2"/>
                                </div>
                                <div className="form-group text-left">
                                  <label htmlFor="multi-step">
                                    Images <FaImages size="1.5em" className="pointer"/>
                                    <small className="m-l-10">(Please click the icon to add more)</small>
                                  </label>
                                  <input type='file' id='multi-step' onChange={(e) => this.onUpload(e, "newStep")}
                                         multiple className="hidden"/>
                                </div>
                                <div className="row">
                                  <div className={"col-md-3 offset-6"}>
                                    <button type="submit" className="btn my-2 btn-primary mb-lg-0 mb-4 w-100"
                                            onClick={this.onDeleteStep}>Delete
                                    </button>
                                  </div>
                                  <div className={"col-md-3"}>
                                    <button type="submit" className="btn my-2 btn-primary mb-lg-0 mb-4 w-100"
                                            onClick={this.onSaveStep}>Save
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12 step-images-container">
                              {
                                !newStep.images || !newStep.images.length ?
                                  <p>No Images Yet.</p> :
                                  <Images images={newStep.images}
                                          removeImage={(e) => this.removeImage(e, "newStep")}/>
                              }
                            </div>
                          </div>
                        </Modal>
                      </Fragment>

                    }
                    <div className="row">
                      <div className={"col-md-3 offset-9 p-0"}>
                        <button type="submit" className="btn my-2 btn-primary mb-lg-0 mb-4 w-100"
                                onClick={this.onSubmit}>{!!data.id ? "Save" : "Continue To Add Steps"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        }

      </Fragment>
    );
  }
}

TripForm.propTypes = {
  createStep: PropTypes.func.isRequired,
  createTrip: PropTypes.func.isRequired,
  updateTrip: PropTypes.func.isRequired,
  getTripById: PropTypes.func.isRequired,
  getTripSteps: PropTypes.func.isRequired,
  deleteStep: PropTypes.func.isRequired,
  updateStep: PropTypes.func.isRequired
};


const initMapStateToProps = state => {
  return {
    trip: state.trips.trip,
    countries: state.countries
  };
};

export default connect(initMapStateToProps, {
  createStep,
  updateStep,
  createTrip,
  updateTrip,
  getTripById,
  getTripSteps,
  deleteStep
})(TripForm);