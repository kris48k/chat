const rest = require('rest');
const mime = require('rest/interceptor/mime');
const React = require('react');

class InputMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { message: '' };
        this.messageChange = this.messageChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    componentDidMount(){
        document.querySelector(".sendForm-input").focus();
    }

    sendMessage(e) {
        e && e.preventDefault();
        rest.wrap(mime, { mime: 'application/json' })({
            method: 'POST',
            path: '/messages',
            entity: {
                userName: this.props.userName, text: this.state.message
            }
        });
        this.setState({ message: '' });
    }

    messageChange(e) {
        this.setState({ message: e.target.value });
    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            this.sendMessage();
        }
    }

    render() {
        return (
            <div className="sendForm">
                <input
                    className="sendForm-input"
                    value={this.state.message}
                    onChange={this.messageChange}
                    onKeyPress={this.onKeyPress}
                />
                <a className="sendForm-send" onClick={this.sendMessage}>Send</a>
            </div>
        );
    };
}

module.exports = InputMessage;