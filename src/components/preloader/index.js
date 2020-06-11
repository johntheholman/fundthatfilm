import React, { Component } from 'react';

class Preloader extends Component {
    render(){
        return(
            <div>
              <div className='spinner-container'>
                 <div className='spinner'></div>
                </div>
             <div className='spinner-disappear'></div>
            </div>
        )
    }
}

export default Preloader;