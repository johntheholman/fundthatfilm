import React, { Component } from 'react';

export default (WrappedComponent, auth) => {
  return class extends Component {
    componentDidMount(){
      if(!auth){
        this.props.history.push('/');
      }
    }

    render(){
      return <WrappedComponent {...this.props} />
    }
  }
}