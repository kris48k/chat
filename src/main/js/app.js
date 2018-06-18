'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const rest = require('rest');
const mime = require('rest/interceptor/mime');
const entity = require('rest/interceptor/entity');
const client = rest
              .chain(mime, { mime: 'application/json' })
              .chain(entity);

class Message extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
	    var message = this.props.data;
	    return (
	        <div className="message">
                <div className="message-author">{ message.userName }</div>
                <div className="message-text">{ message.text }</div>
                <div className="message-time">{ message.date.toLocaleString() }</div>
            </div>
        );
	}
}

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] };
    }

    componentDidMount() {
        rest({ method: 'GET', path: '/messages' }).done(response => {
            console.log("got msgs", response.entity);
            var messages = JSON.parse(response.entity).map(m => {
                m.date = new Date(m.time);
                return m;
            });
            this.setState({ messages: messages });
        });
    }

    render() {
        if (this.state.messages.length > 0) {
            var messages = this.state.messages.map(msg => <Message key={msg.date.getTime()} data={msg}/>);
            return (<div className="list">{messages}</div>);
        }
        return (<div>No messages yet.</div>);
    }
}

class InputMessage extends React.Component {
    render() {
        return (<div className="sendForm">
            <input className="sendForm-input"/>
            <a href="" className="sendForm-send">Send</a>
        </div>)
    };
}

class App extends React.Component {
    render() {
        return (<div className="app">
            <MessageList/>
            <InputMessage/>
        </div>);
    }
}

ReactDOM.render(
	<App />,
	document.getElementById('content')
);
