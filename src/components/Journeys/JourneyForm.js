import React, { Component, Fragment } from "react";
import StaticSlider from "../sliders/StaticSlider";
import { FaImages } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../api/utils";
import { Images, Select } from "../Partials";
import { connect } from "react-redux";
import {
  createJourney,
  updateJourney,
  getJourneyById,
  createStep,
  updateStep,
  getJourneySteps
} from "../../actions/Journey";
import { getCitiesByCountryId } from "../../actions/Country";
import isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";


class JourneyForm extends Component {
  state = {
    data: {
      images: [],
      name: "",
      description: ""
    },
    steps: [],
    newStep: {},
    loading: false,
    categories: [],
    cities: []
  };

  async componentDidMount() {
    if (!!this.props.match.params.id) {
      const id = this.props.match.params.id;
      const { getJourneyById, getJourneySteps } = this.props;
      const temp = await [getJourneyById(id), getJourneySteps(id)];
      this.setState({ data: { ...temp[0].payload }, steps: temp[1] });
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
      }
      else if (file.size > 1164642) {
        toast.error("You can't upload an image with size more than 10MB", {
          hideProgressBar: true
        });
      }
      else {
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
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: { ...this.state.errors, [e.target.name]: null }
    });
  };

  removeImage = image => {
    const { images } = this.state.data;
    this.setState({ data: { ...this.state.data, images: images.filter(img => img !== image) } });
  };

  onSubmit = e => {
    e.preventDefault();
    const { data } = this.state;
    const errors = this.validate(data);
    if (isEmpty(errors)) {
      const { createJourney, updateJourney } = this.props;
      (!!data.id ? updateJourney(data) : createJourney(data))
        .then(place => {
          toast.success("Journey Saved Successfully", {
            hideProgressBar: true
          });
          this.props.history.push(`/journeys/${data.id || place.payload.id}`);
        });
    }
    else {
      toast.error("Invalid form Please check the form's data again!", {
        hideProgressBar: true
      });
    }
  };

  validate = data => {
    return {};
  };

  render() {
    const { data } = this.state;
    return (
      <Fragment>
        <StaticSlider curveImage={require("../../assets/svgs/curvegrey.svg")}/>
        <section id="pagesection">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12 order-md-first order-last">
                <div className="controls">
                  <h3>Journey Form</h3>
                  <div className="form-group">
                    <label htmlFor="form_name p-l-10">Name</label>
                    <input id="form_name" type="text" name="name" className="form-control"
                           value={data.name} onChange={this.onChange}
                           placeholder="Please enter your first name *" required="required"/>
                    <div className="help-block with-errors tiny mt-2"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="form_message p-l-10">Description</label>
                    <textarea id="form_message" name="description" className="form-control" value={data.description}
                              onChange={this.onChange}
                              placeholder="Place Description" rows="4" required="required"/>
                    <div className="help-block with-errors tiny mt-2"/>
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

JourneyForm.propTypes = {
  getCitiesByCountryId: PropTypes.func.isRequired,
  createJourney: PropTypes.func.isRequired,
  updateJourney: PropTypes.func.isRequired,
  getJourneyById: PropTypes.func.isRequired,
  createStep: PropTypes.func.isRequired,
  updateStep: PropTypes.func.isRequired,
  getJourneySteps: PropTypes.func.isRequired
};


const initMapStateToProps = state => {
  return {
    journey: state.journeys.journey
  };
};

export default connect(initMapStateToProps, {
  getCitiesByCountryId,
  createJourney,
  updateJourney,
  getJourneyById,
  createStep,
  updateStep,
  getJourneySteps
})(JourneyForm);