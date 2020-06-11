import React from 'react';
import {Link} from 'react-router-dom';

export default props => {

  return (
    <div className='home-container'>
      <div className='homepage-content'>
        <h1 className='home-title'>Fund That Film</h1> 
        <p className='desktop-paragraph'>Fund That Film enables producers the necessary tools they need in order to present financial data to potential investors and distributors to secure the funding they need to tell compelling stories. We provide a return analysis on the individual projects to be able to position them correctly in the current film market. Let Fund That Film help you tell incredible stories.</p>
        <p className='mobile-paragraph'>Fund That Film gives producers the tools they need to present financial data to potential investors and distributors. We provide a return analysis on individual projects to position them correctly in the current film market. Let Fund That Film help you tell incredible stories.</p>
        <div className='home-button-container'>
          <Link to='/sign_in' className='login-link'>
            <button className='page-button login-button'>Log In</button>
          </Link>
          <Link to='/new_project'>
          <button className='page-button start-project-button'>Try It</button>
          </Link>
        </div>
      </div>
    </div>
  )
}