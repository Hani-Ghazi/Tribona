import React, {Component} from 'react';
import Validator from 'validator';
import InlineErrors from '../messages/InlineErrors'
import PropsTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

class LoginForm extends Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  };

  onChange = e => this.setState({
    data: {...this.state.data, [e.target.name]: e.target.value},
    errors: {...this.state.errors, [e.target.name]: null}
  });
  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    if (isEmpty(errors)) {
      this.props.submit(this.state.data);
    }
    else {
      this.setState({errors});
    }
  };

  validate = (data) => {
    const errors = {};
    if (!data.password) errors.password = `Password can't be blank`;
    if (!data.email) errors.email = `Email can't be blank`;
    else if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";
    return errors;
  };

  render() {
    const {data, errors} = this.state;
    return (
      <form className="login100-form validate-form" onSubmit={this.onSubmit}>
        <span className="login100-form-logo"><i className="zmdi zmdi-landscape"/></span>
        <span className="login100-form-title p-b-34 p-t-27">Log in</span>
        {
          errors.email && <InlineErrors text={errors.email} classes={'dis-block'}/>
        }
        {
          errors.password && <InlineErrors text={errors.password} classes={'dis-block'}/>
        }
        <div className={`wrap-input100 validate-input ${errors.email && 'alert-validate'}`}>
          <input className="input100" type="text" name="email" placeholder="Username" value={data.email}
                 autoComplete="new-password" onChange={this.onChange}/>
          <span className="focus-input100" data-placeholder="&#xf207;"/>

        </div>
        <div className={`wrap-input100 validate-input ${errors.password && 'alert-validate'}`}>
          <input className="input100" type="password" name="password" placeholder="Password" value={data.password}
                 autoComplete="new-password" onChange={this.onChange}/>
          <span className="focus-input100" data-placeholder="&#xf191;"/>
        </div>

        <div className="contact100-form-checkbox">
          <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
          <label className="label-checkbox100" htmlFor="ckb1">
            Remember me
          </label>
        </div>
        <div className="container-login100-form-btn">
          <button className="login100-form-btn">
            Login
          </button>
        </div>
        <div className="text-center p-t-90">
          <a className="txt1" href="#">
            Forgot Password?
          </a>
        </div>
      </form>
    )
  }
}

LoginForm.propsTypes = {
  submit: PropsTypes.func.isRequired
};

export default LoginForm;