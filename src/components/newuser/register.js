import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { showModal, scrollable } from '../../actions';

class Register extends Component {
  handleClick = () => {
    this.props.showModal(false);
    this.props.scrollable('yes-scroll');
  }

  render(){
    return (
      <div className={'modal-container '}>
        <div className='register-modal'>
          <h2>Would you like to register and save your information?</h2>
          <div className='button-container modal-buttons'>
            <Link to='/register'>
              <button className='page-button'>Yes</button>
            </Link>
            <button className='page-button' onClick={this.handleClick}>No</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // register: state.session.register
  }
} 

export default connect(mapStateToProps, {
  showModal, 
  scrollable
})(Register);