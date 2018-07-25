import {LOGIN, LOGOUT} from 'actions/authedUser';

const authedUser = (authedUser = null, action) => {
    switch (action.type) {
        case LOGIN:
            return action.id;
        case LOGOUT:
            return null;
        default:
            return authedUser;
    }
};

export default authedUser;
