const React = require('react');
const rest = require('rest');
const Message = require('./Message');

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] };
        let eventSource = new EventSource("messages/newMessages");
        eventSource.onmessage = this.onMessageAdded.bind(this);
    }

    onMessageAdded(e) {
        let newMessages = [...this.state.messages];
        newMessages.push(prepareMessage(JSON.parse(e.data)));
        this.setState({ messages: newMessages });
        document.querySelector(".list").scrollTop = document.querySelector(".list").scrollHeight;
    }

    componentDidMount() {
        rest({ method: 'GET', path: '/messages' }).done(response => {
            console.log("got msgs", response.entity);
            var messages = JSON.parse(response.entity).map(prepareMessage);
            this.setState({ messages: messages });
        });
    }

    render() {
        if (this.state.messages.length > 0) {
            var messages = this.state.messages.map(msg => <Message key={msg.date.getTime()} data={msg} userName={this.props.userName}/>);
            return (<div className="list">{messages}</div>);
        }
        return (<div className="list--empty">No messages yet.</div>);
    }
}

function prepareMessage(message) {
    message.date = new Date(message.time);
    return message;
}

module.exports = MessageList;