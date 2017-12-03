import './signup.css';
import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../../actions";

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(event) {
    this.props.signupUser({
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


  render() {
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.submitForm}>
          <h2 className="form-signin-heading">Sign up</h2>
          <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} className="form-control" placeholder="Username" required autoFocus/>
          <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} className="form-control" placeholder="Password" required/>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>

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
  return {error: state.auth.authError};
}

export default connect(mapStateToProps, actions)(Signup);