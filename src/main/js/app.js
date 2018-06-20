'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const rest = require('rest');
const entity = require('rest/interceptor/entity');

const InputMessage = require('./components/InputMessage');
const LogInForm = require('./components/LoginForm');

class Message extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
	    const message = this.props.data;
	    const yours = message.userName === this.props.userName;
        const className = "message" + (yours ? " message--yours" : "");
	    return (
	        <div className={className}>
                <div className="message-author message-item">{ message.userName }</div>
                <div className="message-text message-item">{ message.text }</div>
                <div className="message-time message-item">{ message.date.toLocaleString() }</div>
            </div>
        );
	}
}

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] };
        var evtSource = new EventSource("messages/newMessages");
        evtSource.onmessage = (e) => {
            var newMessages = [...this.state.messages];
            newMessages.push(this.prepareMessage(JSON.parse(e.data)));
            this.setState({ messages: newMessages });
        }
    }

    componentDidMount() {
        rest({ method: 'GET', path: '/messages' }).done(response => {
            console.log("got msgs", response.entity);
            var messages = JSON.parse(response.entity).map(this.prepareMessage);
            this.setState({ messages: messages });
        });
    }

    prepareMessage(message) {
        message.date = new Date(message.time);
        return message;
    }

    render() {
        if (this.state.messages.length > 0) {
            var messages = this.state.messages.map(msg => <Message key={msg.date.getTime()} data={msg} userName={this.props.userName}/>);
            return (<div className="list">{messages}</div>);
        }
        return (<div>No messages yet.</div>);
    }
}


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
