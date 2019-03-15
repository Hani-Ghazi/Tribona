import React, { Component, Fragment } from "react";
import StaticSlider from "../sliders/StaticSlider";
import api from "../../api/utils";
import { toast } from "react-toastify";

class ContactPage extends Component {
  state = {
    data: {
      name: "",
      subject: "",
      email: "",
      message: ""
    },
    isLoading: false
  };

  onChange = e => this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value },
    errors: { ...this.state.errors, [e.target.name]: null }
  });

  isValid = () => {
    const { data } = this.state;
    return (data.name !== "" && data.email !== "" && data.subject !== "" && data.message !== "");
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.isValid()) {
      toast.error("Please fill all required data", {
        hideProgressBar: true
      });
      return;
    }
    this.setState({ isLoading: true });
    const { data } = this.state;
    api.sendEmailContact(data)
      .then(() => {
        toast.success("Your message sent successfully, we will contact with you soon!", {
          hideProgressBar: true
        });
        this.setState({
          data: {
            name: "",
            subject: "",
            email: "",
            message: ""
          },
          isLoading: false
        });
      }).catch(e => {
      toast.error("Something went wrong, please try again", {
        hideProgressBar: true
      });
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { data } = this.state;
    return (
      <Fragment>
        <StaticSlider curveImage={require("../../assets/svgs/curvegrey.svg")}/>
        <section id="pagesection">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-12 order-md-first order-last">
                <form id="contact-form" role="form" onSubmit={this.onSubmit}>
                  <div className="controls">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group required">
                          <label htmlFor="form_name">Name</label>
                          <input id="form_name" type="text" name="name" className="form-control"
                                 value={data.name} placeholder="Please enter your name *"
                                 autoComplete="off"
                                 required onChange={this.onChange}/>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group required">
                          <label htmlFor="email">Email</label>
                          <input id="email" type="email" name="email" className="form-control"
                                 value={data.email} placeholder="Please enter your Email*"
                                 autoComplete="off"
                                 required onChange={this.onChange}/>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group required">
                          <label htmlFor="subject">subject</label>
                          <input id="subject" type="text" name="subject" className="form-control"
                                 value={data.subject} placeholder="Please enter then subject*"
                                 autoComplete="off"
                                 required onChange={this.onChange}/>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group required">
                          <label htmlFor="message">Message</label>
                          <textarea id="message" name="message" className="form-control" value={data.message}
                                    onChange={this.onChange}
                                    placeholder="What tour are you interested in? *" rows="4" required/>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <button type="submit" disabled={!this.isValid()}
                                className={`btn btn-primary px-4 btn-send ${!this.isValid() ? "disabled" : ""}`}>
                          Send message
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-5 col-12 mb-5 text-left">
                <h3 className="black bold front mb-2 mt-2 ">About us</h3>
                <h5 className="primary-color section-title mb-3">Send me some text to replace</h5>
                <div className="separator"/>
                <p className=" text-block">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                  ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
                  Nulla consequat massa quis enim. Donec pede justo ..</p>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default ContactPage;