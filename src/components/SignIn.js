import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {login} from 'actions/authedUser';
import {handleSignUp} from 'actions/users';

class SignIn extends React.Component {
    static view = {
        LOGIN: 'LOGIN',
        SIGNUP: 'SIGNUP'
    };

    state = {
        view: this.props.view || SignIn.view.LOGIN,
        name: '',
        username: ''
    };

    normalizeUsername = username => username.replace(/[^a-z]/ig, '').toLowerCase();

    handleChangeView = (e) => {
        this.setState({view: e.target.name})
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleLogin = (e) => {
        e.preventDefault();

        const {dispatch} = this.props;
        const {username} = this.state;

        if (username) {
            dispatch(login(username));
        }
    };

    handleSignUp = (e) => {
        e.preventDefault();

        const {users, dispatch} = this.props;
        const {name} = this.state;
        const username = this.normalizeUsername(name);

        if (username && !users[username]) {
            dispatch(handleSignUp(username, name.trim()))
                .then(() => {
                    dispatch(login(username));
                });
        }
    };

    render() {
        const {view, name, username} = this.state;
        const {users} = this.props;

        return (
            <div>
                <div className='connected'>
                    <button
                        onClick={this.handleChangeView}
                        name={SignIn.view.LOGIN}
                        className={view === SignIn.view.LOGIN ? 'selected' : ''}
                    >
                        Login
                    </button>

                    <button
                        onClick={this.handleChangeView}
                        name={SignIn.view.SIGNUP}
                        className={view === SignIn.view.SIGNUP ? 'selected' : ''}
                    >
                        Sign up
                    </button>
                </div>

                {view === SignIn.view.LOGIN && (
                    <Fragment>
                        <h1>Login</h1>
                        <form onSubmit={this.handleLogin}>
                            <select className='btn' name='username' onChange={this.handleChange} value={username}>
                                <option>Select</option>
                                {Object.keys(users).map(id => <option key={id} value={id}>{users[id].name}</option>)}
                            </select>

                            <button>Login</button>
                        </form>
                    </Fragment>
                )}

                {view === SignIn.view.SIGNUP && (
                    <Fragment>
                        <h1>Sign up</h1>

                        <form onSubmit={this.handleSignUp}>
                            <input autoComplete='off' name='name' onChange={this.handleChange} value={name}/>

                            <button>Sign up</button>

                            {name && (
                                <img alt={`${name}'s avatar`} style={{'float': 'left'}} width='25'
                                     src={`https://api.adorable.io/avatars/25/${this.normalizeUsername(name)}.png`}/>
                            )}
                        </form>
                    </Fragment>
                )}
            </div>
        )
    }
}

function mapStateToProps({users}) {
    return {users};
}

export default connect(mapStateToProps)(SignIn);
