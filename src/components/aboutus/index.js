import React, { Component } from 'react';
import Person from './person';
import john from '../../assets/images/john.png';
import danika from '../../assets/images/danika.png';
import diana from '../../assets/images/diana.png';
import christine from '../../assets/images/christine.png';
import Nav from '../navbar/index';
import '../../section/aboutus.scss';

class CardsContainer extends Component {
  info = { 
    people:  [
      {
        name: 'John Holman',
        image: john,
        title: 'Backend Developer',
        linkedin:'//www.linkedin.com/in/johntheholman/',
        github: '//github.com/johntheholman',
        portfolio:'//johntheholman.com/'
      },
      {
        name: 'Diana Curtis',
        image: diana,
        title: 'Backend Developer',
        linkedin:'//www.linkedin.com/in/diana-curtis/',
        github: '//github.com/DianaCurtis',
        portfolio:'//dianacurtisdev.com/'
      },
      {
        name: 'Danika Quinteros',
        image: danika,
        title: 'Frontend Developer',
        linkedin:'//www.linkedin.com/in/danikaquinteros/',
        github: '//github.com/dazcha76',
        portfolio:'//www.danikaquinteros.com'
      },
      {
        name: 'Christine Than',
        image: christine,
        title: 'Frontend Developer',
        linkedin:'//www.linkedin.com/in/christinepthan/',
        github: '//github.com/krispthan',
        portfolio:'//www.christinethan.com'
      },
    ]
  }
        
  buildPersonInfo(person) {
    return (
      <Person 
        key={ person.name } 
        name={ person.name } 
        title={person.title} 
        image={ person.image } 
        linkedin={ person.linkedin }
        github={ person.github } 
        portfolio={ person.portfolio } 
      />
    )
  }

  render(){
    const personCard = this.info.people.map(this.buildPersonInfo);

    return(
      <div className= 'main-container about'>
        <Nav/>
        <h1 className='desktop'>Meet The Team</h1>
        <h1 className='mobile'>Meet <br/> The Team</h1>
        <div className= 'person-container'> 
          { personCard }
        </div>
      </div>
    )
  }
}

export default CardsContainer;
