import React, { Component, Fragment } from "react";
import { forgetPassword } from "../../actions/Auth";
import { connect } from "react-redux";
import Validator from "validator";

import Header from "../header";
import bgImage from "../../assets/login/images/bg-01.jpg";
import { Link } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import InlineErrors from "../messages/InlineErrors";


class ForgetPasswordPage extends Component {

  state = {
    data: {
      email: ""
    },
    errors: []
  };

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    if (isEmpty(errors)) {
      this.props.forgetPassword(this.state.data).then(res => {
        this.props.history.push({
          pathname: "/reset",
          state: {
            email: this.state.data.email,
            resetToken: res.resetToken
          }
        });
      });
    }
    else
      this.setState({ errors });
  };

  validate = (data) => {
    const errors = [];
    if (!data.email) errors.push(`Empty Email!, please fill all required data`);
    else if (!Validator.isEmail(data.email)) errors.push(`Invalid Email`);
    return errors;
  };

  onChange = e => this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value },
    errors: []
  });


  render() {
    const { data, errors } = this.state;
    return (
      <Fragment>
        {/*<Header/>*/}
        <div className="limiter">
          <div className="container-login100" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="wrap-login100" style={{ width: "35%" }}>
              <span className="dis-block text-center w-100">
                <img src={require("../../assets/images/logo.png")} alt="logo"
                     className={"img-fluid dis-block m-auto w-50"}/>
              </span>
              <form onSubmit={this.onSubmit}>
                <p className={"p-t-50 dis-block p-t-60 white"}>Please enter your email to send you an email to reset
                  your
                  password.</p>
                {
                  (errors || []).map(err => <InlineErrors text={err} classes={"dis-block"}/>)
                }
                <div className={`wrap-input100 validate-input`}>
                  <input className="input100" type="text" name="email" placeholder="Email" onChange={this.onChange}
                         autoComplete="new-password" value={data.email}/>
                  <span className="focus-input100" data-placeholder="&#xf207;"/>

                </div>
                <div className="container-login100-form-btn" style={{ justifyContent: "flex-end" }}>
                  <button className="login100-form-btn">
                    Send
                  </button>
                </div>
              </form>
              <div className={"p-t-30"}>
                <p>Nice, you can remember your credentials! <Link to={"/login"} className={"white m-l-10"}>Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(null, { forgetPassword })(ForgetPasswordPage);