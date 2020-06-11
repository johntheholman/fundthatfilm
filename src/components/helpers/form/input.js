import React, { Component } from 'react';

class Input extends Component {
  render(){
    const { input, type, meta:{ touched, error }, ...props } = this.props;

    return (
      <div className='input-container'>
        <input {...input} type={type} />
        <p className='required'>{ touched && error }</p>
      </div>
    )
  }
}
 
export default Input;