import {RECEIVE_USERS, SIGN_UP, USER_ADD_QUESTION, USER_VOTE} from 'actions/users';

const users = (users = null, action) => {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...users,
                ...action.users
            };
        case SIGN_UP:
            if (!users[action.user.id]) {
                return {
                    ...users,
                    [action.user.id]: action.user
                };
            }
            return users;
        case USER_VOTE:
            return {
                ...users,
                [action.userId]: {
                    ...users[action.userId],
                    answers: {
                        ...users[action.userId].answers,
                        [action.questionId]: action.selectedOption
                    },
                }
            };
        case USER_ADD_QUESTION:
            return {
                ...users,
                [action.uid]: {
                    ...users[action.uid],
                    questions: users[action.uid].questions.concat([action.qid]),
                }
            };
        default:
            return users;
    }
};

export default users;
