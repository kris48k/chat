const React = require('react');

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

module.exports = Message;