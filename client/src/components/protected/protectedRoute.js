import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router'
import {push} from 'react-router-redux'

export const ProtectedRoute = ({component: ComposedComponent, ...rest}) => {

  class Authentication extends Component {

    handleRender(props) {
      if (this.props.authenticated) {
        this.props.dispatch(push('/signin'));
        return <div/>
      }
      return <ComposedComponent {...props}/>
    }

    render() {
      return (
        <Route {...rest} render={this.handleRender.bind(this)}/>
      )
    }
  }

  function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated};
  }

  const AuthenticationContainer = connect(mapStateToProps)(Authentication);
  return <AuthenticationContainer/>
};