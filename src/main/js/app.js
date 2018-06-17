'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
//const client = require('./client');

class App extends React.Component {
    render() {
        return (<div>It works!</div>);
    }
}

ReactDOM.render(
	<App />,
	document.getElementById('content')
);
