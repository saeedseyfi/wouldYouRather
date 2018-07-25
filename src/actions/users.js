import {saveUser} from 'api';
import {hideLoading, showLoading} from 'react-redux-loading';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SIGN_UP = 'SIGN_UP';
export const USER_VOTE = 'USER_VOTE';
export const USER_ADD_QUESTION = 'USER_ADD_QUESTION';

export const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

export const signUp = (user) => ({
    type: SIGN_UP,
    user
});

export const vote = (questionId, userId, selectedOption) => ({
    type: USER_VOTE,
    questionId,
    userId,
    selectedOption
});

export const userAddQuestion = (uid, qid) => ({
    type: USER_ADD_QUESTION,
    uid,
    qid
});

export const handleSignUp = (id, name) => {
    return function (dispatch) {
        dispatch(showLoading());

        const user = {
            id,
            name,
            avatarURL: `https://api.adorable.io/avatars/88/${id}.png`,
            answers: {},
            questions: [],
        };

        return saveUser(user)
            .then(() => {
                dispatch(signUp(user));
                dispatch(hideLoading());
            })
    }
};
