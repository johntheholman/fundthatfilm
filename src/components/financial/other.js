import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getFinancialData } from '../../actions';
import Preloader from '../preloader/index';

class Other extends Component {
  render(){
    const { finance } = this.props;

    if(!finance["total distributor's net"]){
      return <Preloader/>;
    }
      
    return(
      <div className='card-financial-global-wrapper'>
        <div className='card financial-card other-card'>
          <h5 className='financial-header'>OTHER</h5>
          <div className='financial-body other-body'>
            <div>
              <p><span className='green'>Total Distributor's Net:</span><br/> ${this.props.finance["total distributor's net"].toLocaleString()}</p>
              <p><span className='green'>Distributor's Net Earning To Cost Ratio:</span><br/> {this.props.finance["distributor's net earning to cost ratio"]}</p>
              <p><span className='green'>Expenses After Distributor's Net:</span><br/> ${this.props.finance["expenses after distributor's net"].toLocaleString()}</p>
              <p><span className='green'>Production Financing Expense:</span><br/> ${this.props.finance['production financing expense'].toLocaleString()}</p>
              <p><span className='green'>Negative Cost:</span><br/> ${this.props.finance['negative cost'].toLocaleString()}</p>
            </div>
            <div>
              <p><span className='green'>Talent Participation:</span><br/> ${this.props.finance['talent participation'].toLocaleString()}</p>
              <p><span className='green'>Talent Residuals:</span><br/> ${this.props.finance['talent residuals'].toLocaleString()}</p>
              <p><span className='green'>Studio's Share:</span><br/> ${this.props.finance["studio's share"].toLocaleString()}</p>
              <p><span className='green'>Studio Burden:</span><br/> ${this.props.finance['studio burden'].toLocaleString()}</p>
              <p><span className='green'>Sales Agent Direct Sales Expenses:</span><br/> ${this.props.finance['sales agent direct sales expenses'].toLocaleString()}</p>
            </div>
            <div>
              <p><span className='green'>Producer's Share:</span><br/> ${this.props.finance["producer's share"].toLocaleString()}</p>
              <p><span className='green'>Producer's Gross:</span><br/> ${this.props.finance["producer's gross"].toLocaleString()}</p>
              <p><span className='green'>Producer's Net:</span><br/> ${this.props.finance["producer's net"].toLocaleString()}</p>
              <p><span className='green'>Global Brand Tie-in Fees:</span><br/> ${this.props.finance['global brand tie-in fees'].toLocaleString()}</p>
            </div>
          </div>
        </div>    
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    finance: state.finance.financeList[0]
  }
}
export default connect(mapStateToProps, {
  getFinancialData
})(Other);