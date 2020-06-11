import React, { Component } from 'react';
import axios from 'axios';

class Test extends Component {
	async componentDidMount(){
		const resp = await axios.get('/api/test.php');
	}

	render(){
		return <h1>Test</h1>;
	}
}

export default Test;
