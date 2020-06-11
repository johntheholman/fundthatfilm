import React, { Component } from 'react';
import '../../section/messagesent.scss';
import Nav from '../navbar/index';

const MessageSent = () => {
  return (
    <div className='main-container'>
      <Nav/>
      <h1>Your message has been sent!</h1>
      <h1>Thank You!</h1>
    </div>
  )
}

export default MessageSent;
