import {combineReducers} from 'redux';
import {loadingBarReducer as loadingBar} from 'react-redux-loading';
import questions from './questions';
import users from './users';
import authedUser from './authedUser';

export default combineReducers({
    questions,
    users,
    authedUser,
    loadingBar
})