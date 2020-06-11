import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getFinancialData } from '../../actions';
import Preloader from '../preloader/index';

class International extends Component {
  render(){
    const { finance } = this.props;

    if(!finance['total net earnings']){
      return <Preloader/>;
    }
    
    return (
      <div className='card-financial-global-wrapper'>
        <div className='card financial-card international-card'>
          <h5 className='financial-header'>INTERNATIONAL</h5>
          <div className="financial-body international-body">
            <p><span className='green'>Theatrical, Home, TV Gross:</span><br/> ${this.props.finance['theatrical, home, tv gross'].toLocaleString()}</p>
            <p><span className='green'>Sales Agent Fee:</span><br/> ${this.props.finance['sales agent fee'].toLocaleString()}</p>
            <p><span className='green'>Total Net Earnings</span>:<br/> ${this.props.finance['total net earnings'].toLocaleString()}</p>
          </div>
        </div>
      </div>
    ) 
  }
}

const mapStateToProps = state => {
  return {
    finance: state.finance.financeList[0]['international']
  }
}

export default connect(mapStateToProps, {
  getFinancialData
})(International);