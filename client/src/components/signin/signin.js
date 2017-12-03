import './signin.css';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import {push} from 'react-router-redux'

class Signin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.redirectSignup = this.redirectSignup.bind(this);
  }

  submitForm(event) {
    this.props.signinUser({
      username: this.state.username,
      password: this.state.password
    });
    event.preventDefault();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  redirectSignup(event) {
    this.props.redirect('/signup');
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.submitForm}>
          <h2 className="form-signin-heading">Sign in</h2>
          <p><small>You can <a onClick={this.redirectSignup} href="/signup">Sign up</a> if you do not have an account</small></p>
          <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} className="form-control" placeholder="Username" required autoFocus/>
          <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} className="form-control" placeholder="Password" required/>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>

          {this.props.error ?
          <div className="alert alert-danger mt-1">
            <strong>Oops: </strong>{this.props.error}
          </div>
          : null}
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.authError,
    redirect: state.auth.redirect
  };
}

export default connect(mapStateToProps, actions)(Signin);