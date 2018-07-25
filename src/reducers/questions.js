import {RECEIVE_QUESTIONS, QUESTION_VOTE, ADD_QUESTION} from 'actions/questions';

const questions = (questions = null, action) => {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...action.questions
            };
        case QUESTION_VOTE:
            return {
                ...questions,
                [action.questionId]: {
                    ...questions[action.questionId],
                    [action.selectedOption]: {
                        ...questions[action.questionId][action.selectedOption],
                        votes: questions[action.questionId][action.selectedOption].votes.concat(action.userId)
                    }
                }
            };
        case ADD_QUESTION:
            return {
                ...questions,
                [action.question.id]: action.question
            };
        default:
            return questions;
    }
};

export default questions;
