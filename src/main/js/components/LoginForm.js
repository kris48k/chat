const React = require('react');

class LogInForm extends React.Component {
    constructor(props) {
        super(props);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.userNameChange = this.userNameChange.bind(this);
        this.state = { userName: '' };
    }

    componentDidMount() {
        document.querySelector(".loginForm-input").focus();
    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            this.props.updateUserName(this.state.userName);
        }
    }

    userNameChange(e) {
        this.setState({ userName: e.target.value });
    }

    render() {
        return (
            <div className="loginForm">
                <label className="loginForm-label">Enter your name: </label>
                <input
                    className="loginForm-input"
                    value={this.state.userName}
                    onKeyPress={this.onKeyPress}
                    onChange={this.userNameChange}
                />
            </div>
        );
    }
}

module.exports = LogInForm;