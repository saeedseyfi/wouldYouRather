import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import SignIn from 'components/SignIn';

class Authenticate extends React.Component {
    render() {
        const {loggedIn, children} = this.props;

        return loggedIn ? (children || <Fragment/>) : <SignIn/>
    }
}

function mapStateToProps({authedUser}) {
    return {loggedIn: !!authedUser}
}

const ConnectedAuthenticate = connect(mapStateToProps)(Authenticate);

export const withAuthenticate = (Comp) => props => <ConnectedAuthenticate><Comp {...props}/></ConnectedAuthenticate>;
