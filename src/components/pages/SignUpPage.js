import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from "lodash/isEmpty";
import Validator from "validator";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import {FaFacebookF} from "react-icons/fa";
import TwitterLogin from "react-twitter-auth";
import {Link} from "react-router-dom";
import {signup} from '../../actions/Auth'
import InlineErrors from "../messages/InlineErrors";
import bgImage from '../../assets/login/images/bg-01.jpg';

class SignUpPage extends Component {
  state = {
    data: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    loading: false,
    errors: []
  };

  submitSignUp = data => this.props.signup(data).then((res) => this.props.history.push({
    pathname: '/verify',
    state: {
      email: data.email,
      verificationToken: res.verificationToken
    }
  }));

  responseFacebook = (res) => {
    if (!res.error) {
      this.setState({facebookData: {access_token: res.accessToken}}, () => {
        this.props.loginViaFacebook(this.state.facebookData).then(() => {
          this.props.history.push('/');
        })
      });
    }
  };

  responseGoogle = (res) => {
    if (!res.error) {
      this.setState({googleData: {access_token: res.accessToken}}, () => {
        this.props.loginViaGoogle(this.state.googleData).then(() => {
          this.props.history.push('/');
        })
      });
    }
  };

  onChange = e => this.setState({
    data: {...this.state.data, [e.target.name]: e.target.value},
    errors: []
  });

  validate = (data) => {
    const errors = [];
    if (!data.firstName || !data.lastName || !data.email || !data.password)
      errors.push('* Please fill all required data');
    else {
      if (!Validator.isEmail(data.email)) errors.push('* Invalid Email');
      if (data.password !== data.confirmPassword) errors.push(`* Password Doesn't match`);
    }
    return errors;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    if (isEmpty(errors)) {
      this.submitSignUp(this.state.data);
    }
    else {
      this.setState({errors});
    }
  };

  render() {
    const {errors, data} = this.state;
    return (
      <div className="limiter">
        <div className="container-login100" style={{backgroundImage: `url(${bgImage})`}}>
          <div className="wrap-login100">
            <form className="login100-form validate-form" onSubmit={this.onSubmit}>
              <span>
                <img src={require('../../assets/images/logo.png')} alt="logo" className={'img-fluid'}/>
              </span>
              <span className="login100-form-title p-b-34 p-t-27">Sign Up</span>
              {
                (errors || []).map(err => <InlineErrors text={err} classes={'dis-block'}/>)
              }
              <div className={`wrap-input100 validate-input ${errors.firstName && 'alert-validate'}`}>
                <input className="input100" type="text" name="firstName" placeholder="First Name" value={data.firstName}
                       autoComplete="new-password" onChange={this.onChange}/>
                <span className="focus-input100" data-placeholder="&#xf207;"/>

              </div>
              <div className={`wrap-input100 validate-input ${errors.lastName && 'alert-validate'}`}>
                <input className="input100" type="text" name="lastName" placeholder="Last Name" value={data.lastName}
                       autoComplete="new-password" onChange={this.onChange}/>
                <span className="focus-input100" data-placeholder="&#xf207;"/>

              </div>
              <div className={`wrap-input100 validate-input ${errors.email && 'alert-validate'}`}>
                <input className="input100" type="email" name="email" placeholder="Email" value={data.email}
                       autoComplete="new-password" onChange={this.onChange}/>
                <span className="focus-input100" data-placeholder="&#xf207;"/>

              </div>

              <div className={`wrap-input100 validate-input ${errors.password && 'alert-validate'}`}>
                <input className="input100" type="password" name="password" placeholder="Password" value={data.password}
                       autoComplete="new-password" onChange={this.onChange}/>
                <span className="focus-input100" data-placeholder="&#xf191;"/>
              </div>
              <div className={`wrap-input100 validate-input ${errors.confirmPassword && 'alert-validate'}`}>
                <input className="input100" type="password" name="confirmPassword" placeholder="Confirm Password"
                       value={data.confirmPassword}
                       autoComplete="new-password" onChange={this.onChange}/>
                <span className="focus-input100" data-placeholder="&#xf191;"/>
              </div>
              <div className="container-login100-form-btn p-t-30 p-b-30">
                <button className="login100-form-btn w-100">
                  Sign up
                </button>
              </div>
              <div className="login100-form-title white p-b-30">
                OR signup via
              </div>
              <div className="text-center">
                <GoogleLogin
                  clientId="859154390049-g228vndqhh1ah0sr0rughb5rh23bvjfo.apps.googleusercontent.com"
                  redirectUri="https://localhost:3000"
                  buttonText=""
                  className="social-icon"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                />
                <FacebookLogin
                  appId="2419694401378299"
                  cssClass="social-icon facebok-icon"
                  size="small"
                  textButton=""
                  icon={<FaFacebookF/>}
                  fields="name,email,picture"
                  callback={this.responseFacebook}
                  autoLoad={false}
                />
                <TwitterLogin
                  loginUrl="http://localhost:4000/api/v1/auth/twitter"
                  onFailure={this.responseGoogle} onSuccess={this.responseGoogle}
                  requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
                  text=""
                  className="social-icon"
                />
              </div>
              <div className="text-center p-t-30">
                <p>
                  Already have an account? <Link className="white" to={'/login'}>login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>)
  }
}

SignUpPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, {signup})(SignUpPage);