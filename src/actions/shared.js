import {hideLoading, showLoading} from 'react-redux-loading';
import {getUsers, getQuestions} from 'api';
import {receiveQuestions} from './questions';
import {receiveUsers} from './users';

export function handleInitialData() {
    return function (dispatch) {
        dispatch(showLoading());

        Promise.all([
            getUsers(),
            getQuestions()
        ])
            .then(([users, questions]) => {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
                dispatch(hideLoading());
            }, () => {
                alert('Loading initial data failed, please try again...');
                dispatch(hideLoading());
            });
    }
}