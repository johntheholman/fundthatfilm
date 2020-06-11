import React from 'react';
import '../../section/aboutus.scss';

export default props => {
  return (
    <div className='person'>
      <img src={ props.image } className='profile-pic'/>
      <h4>{ props.name }</h4>
      <h5>{ props.title }</h5>
      <div className='social-icon-container'>
        <a href={ props.github } target='_blank'><i className='fab fa-github-square'></i></a>
        <a href={ props.linkedin } target='_blank'><i className='fab fa-linkedin'></i></a>
        <a href={ props.portfolio } target='_blank'><i className='fas fa-globe'></i></a>
      </div>          
    </div>
  )
} 