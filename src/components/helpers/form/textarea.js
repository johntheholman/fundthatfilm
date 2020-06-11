import React, { Component } from 'react';

class Textarea extends Component {
  render(){
    const { input, type, meta:{ touched, error }, ...props } = this.props;

    return (
      <div className='textarea-container'>
        <textarea 
          autoComplete='off'
          onBlur={input.onBlur}
        />
        <p className='required'>{ touched && error }</p>
      </div>
    )
  }
}
 
export default Textarea;