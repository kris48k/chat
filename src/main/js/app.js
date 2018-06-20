'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const rest = require('rest');
const entity = require('rest/interceptor/entity');

const InputMessage = require('./components/InputMessage');
const LogInForm = require('./components/LoginForm');
const MessageList = require('./components/MessageList');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userName: '' };
        this.updateUserName = this.updateUserName.bind(this);
    }

    updateUserName(newUserName) {
        this.setState({ userName: newUserName });
    }

    render() {
        if (this.state.userName === '') {
            return <LogInForm updateUserName={this.updateUserName} />
        } else {
            return (<div className="app">
                <MessageList userName={this.state.userName}/>
                <InputMessage userName={this.state.userName}/>
            </div>);
        }
    }
}

ReactDOM.render(
	<App />,
	document.getElementById('content')
);
