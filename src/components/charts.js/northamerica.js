import React, { Component } from 'react';
import Chart from 'chart.js';
import { connect } from 'react-redux';
import { getFinancialData } from '../../actions';

class NorthAmericaGraphs extends Component {
  divisible = (value) => {
      if(value <= 10000){
          return (value/1000).toFixed(1)
      } else if(value <= 100000){
          return (value/10000).toFixed(1)
      } else if(value <= 1000000){
          return (value/100000).toFixed(1)
      } else if(value > 1000000){
          return (value/1000000).toFixed(1)
      }
  }

  componentDidUpdate() {
    let ctx = document.getElementById('northAmericaChart');
    let northAmericaChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Theatrical',
          'Home Entertaining',
          'Pay Per View',
          'Premium Cable',
          'Free TV Premiere',
          'Cable & Syndicated TV',
          'Total Net Earnings'
        ],
        datasets: [
          {
            label: 'Production Gross in Millions',
            data: [
              this.divisible(this.props.finance['theatrical']['gross']),
              this.divisible(this.props.finance['home entertainment']['gross']),
              this.divisible(this.props.finance['pay per view']['gross']),
              this.divisible(this.props.finance['premium cable']['gross']),
              this.divisible(this.props.finance['free tv premiere']['gross']),
              this.divisible(this.props.finance['cable and syndicated tv']['gross']),
              this.divisible(this.props.finance['total net earnings'])
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255,99,132,1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
                responsive: true,
                animation: {
                  easing: 'easeInCirc',
                  duration:1000
                },
                legend:{ 
                    display : false,
                    labels:{
                        fontColor:'#35f8c7',
                        padding: 3,
                        fontStyle:'normal'
                    }
                },
                title:{
                    display:true,
                    padding:5,
                    fontColor:'#35f8c7',
                    fontFamily: 'sans-serif'
                },
                tooltips: {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  titleFontSize: 16,
                  titleFontColor: '#000',
                  bodyFontColor: '#000',
                  bodyFontSize: 16
                }
            }
    });
  }
  render() {
    return <canvas id='northAmericaChart' width='200' height='50' />;
  }
}

const mapStateToProps = state => {
    return {
        finance: state.finance.financeList[0]['north america']
    }
}

export default connect(mapStateToProps, {
    getFinancialData 
})(NorthAmericaGraphs);