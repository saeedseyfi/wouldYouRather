import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {logout} from 'actions/authedUser';

class UserInfo extends React.Component {
    handleLogout = (e) => {
        e.preventDefault();

        const {dispatch} = this.props;

        dispatch(logout())
    };

    render() {
        const {user} = this.props;

        if (!user) {
            return <Fragment/>
        }

        return (
            <ul className='user-info'>
                <li>
                    <img
                        src={user.avatarURL}
                        alt={user.name}
                        width={19}
                        style={{'float': 'left'}}
                    />
                    <span>{user.name}</span>
                </li>

                <li>
                    <a href='/' onClick={this.handleLogout}>Logout</a>
                </li>
            </ul>
        )
    }
}

function mapStateToProps({authedUser, users}) {
    return {user: authedUser ? users[authedUser] : null};
}

export default connect(mapStateToProps)(UserInfo);
