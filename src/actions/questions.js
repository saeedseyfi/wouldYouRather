import {hideLoading, showLoading} from 'react-redux-loading';
import {saveQuestionAnswer, saveQuestion} from 'api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const QUESTION_VOTE = 'QUESTION_VOTE';
export const ADD_QUESTION = 'ADD_QUESTION';

export const receiveQuestions = questions => ({
    type: RECEIVE_QUESTIONS,
    questions
});

export const vote = (questionId, userId, selectedOption) => ({
    type: QUESTION_VOTE,
    questionId,
    userId,
    selectedOption
});

export const addQuestion = (question, author) => ({
    type: ADD_QUESTION,
    question,
    author
});

export const handleVote = (questionId, userId, selectedOption) => {
    return function (dispatch) {
        dispatch(showLoading());

        return saveQuestionAnswer({
            authedUser: userId,
            qid: questionId,
            answer: selectedOption
        })
            .then(() => {
                dispatch(vote(questionId, userId, selectedOption));
                dispatch(hideLoading());
            })
    }
};

export const handleAddQuestion = (optionOneText, optionTwoText, author) => {
    return function (dispatch) {
        dispatch(showLoading());

        const question = {optionOneText, optionTwoText, author};

        return saveQuestion(question)
            .then((question) => {
                dispatch(addQuestion(question, author));
                dispatch(hideLoading());
                return question;
            })
    }
};
