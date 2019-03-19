import React, { Component, Fragment } from "react";
import StaticSlider from "../sliders/StaticSlider";
import { Images } from "../Partials";
import { FaImages } from "react-icons/fa";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import PageLoader from "../Loaders/pageLoader";
import ActionLoader from "../Loaders/actionLoader";
import {
  updateUser
} from "../../actions/User";
import api from "../../api/utils";

const goTop = () => {
  window.scrollTo({
    top: 300,
    behavior: "smooth"
  });
};


class ProfileForm extends Component {
  state = {
    isLoading: true,
    isUpdating: false,
    data: {}
  };

  componentDidMount() {
    this.setState({ data: this.props.user, isLoading: false }, goTop);
  }

  onUpload = (e, key = "data") => {
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
            [key]: images[0].filename
          }
        });
      });
    }
  };

  removeImage = (image, key = "data") => {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        [key]: null
      }
    });
  };

  onChange = e => this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value },
    errors: { ...this.state.errors, [e.target.name]: null }
  });

  onSubmit = e => {
    const { data } = this.state;
    const { updateUser } = this.props;
    this.setState({ isUpdating: true });
    updateUser(data)
      .then(res => {
        toast.success("Profile updated successfully", {
          hideProgressBar: true
        });
        this.setState({ data: res.payload, isUpdating: false }, goTop);
      })
      .catch(e => {
        toast.success("Something went wrong, please try again", {
          hideProgressBar: true
        });
        this.setState({ isUpdating: false }, goTop);
      });
  };

  render() {
    const { isLoading, isUpdating, data } = this.state;
    if (isLoading) {
      return <PageLoader/>;
    }
    return (
      <Fragment>
        <StaticSlider curveImage={require("../../assets/svgs/curvegrey.svg")}/>
        {
          isUpdating && <ActionLoader/>
        }
        <section id="pagesection">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12 order-md-first order-last">
                <div className="controls">
                  <h3>Profile</h3>
                  <div className="form-group">
                    <label htmlFor="form_name p-l-10">First Name</label>
                    <input id="form_name" type="text" name="firstName" className="form-control"
                           value={data.firstName} onChange={this.onChange}
                           placeholder="Please enter your first name *" required="required"/>
                    <div className="help-block with-errors tiny mt-2"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="form_name p-l-10">Last Name</label>
                    <input id="form_name" type="text" name="lastName" className="form-control"
                           value={data.lastName} onChange={this.onChange}
                           placeholder="Please enter your last name *" required="required"/>
                    <div className="help-block with-errors tiny mt-2"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="form_name p-l-10">First Name</label>
                    <input id="form_name" type="email" name="email" className="form-control"
                           value={data.email} onChange={this.onChange}
                           placeholder="Please enter your email"/>
                    <div className="help-block with-errors tiny mt-2"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="form_name p-l-10">First Name</label>
                    <input id="form_name" type="number" name="phone" className="form-control"
                           value={data.phone} onChange={this.onChange}
                           placeholder="Please enter your phone number"/>
                    <div className="help-block with-errors tiny mt-2"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="form_message">Description</label>
                    <textarea id="form_message" name="description" className="form-control" value={data.description}
                              onChange={this.onChange}
                              placeholder="Place Description" rows="4" required="required"/>
                    <div className="help-block with-errors tiny mt-2"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">
                      Profile User Image <FaImages size="1.5em" className="pointer"/>
                      <small className="m-l-10">(Please click the icon to add more)</small>
                    </label>
                    <input type='file' id="image" onChange={(e) => this.onUpload(e, "image")} className="hidden"/>
                  </div>
                  <div className="form-group">
                    <Images images={data.image || []} removeImage={(e) => this.removeImage(e, "image")}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="bgImage">
                      Profile Background Image <FaImages size="1.5em" className="pointer"/>
                      <small className="m-l-10">(Please click the icon to add more)</small>
                    </label>
                    <input type='file' id="bgImage" onChange={(e) => this.onUpload(e, "bgImage")}
                           className="hidden"/>
                  </div>
                  <div className="form-group">
                    <Images images={data.bgImage || []} removeImage={(e) => this.removeImage(e, "bgImage")}/>
                  </div>
                  <div className="row">
                    <div className={"col-md-3 offset-9 p-0"}>
                      <button type="submit" className="btn my-2 btn-primary mb-lg-0 mb-4 w-100"
                              onClick={this.onSubmit}>{"Save"}
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

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps, { updateUser })(ProfileForm);