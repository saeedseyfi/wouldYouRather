import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {handleVote as questionVote} from 'actions/questions';
import {vote as userVote} from 'actions/users';

class Poll extends React.Component {
    getHandleVote = selectedOption => () => {
        const {question, authedUser, dispatch} = this.props;

        dispatch(questionVote(question.id, authedUser, selectedOption))
            .then(() => {
                dispatch(userVote(question.id, authedUser, selectedOption));
            });
    };

    getPercentage = (question, option) => {
        const votesToTheOption = question[option].votes.length;
        const allVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
        return (votesToTheOption / allVotes * 100).toString().substring(0, 4);
    };

    render() {
        const {question, alreadyVoted, author, voteable, authedUser} = this.props;
        const {id, optionOne, optionTwo} = question;

        return (
            <div className='poll'>
                <div className='author'>
                    <img src={author.avatarURL} alt={`${author.name}'s avatar`}/>
                </div>

                <div className='question'>
                    <h2>Would you rather?</h2>
                    <small>by {author.name}</small>

                    <div>
                        {voteable ? (
                            alreadyVoted ? (
                                <Fragment>
                                    <strong>Voted {optionOne.votes.concat(optionTwo.votes).length} times:</strong>
                                    <div>
                                        <p className={optionOne.votes.includes(authedUser) ? `voted` : ''}>
                                            {optionOne.text} ➡ {this.getPercentage(question, 'optionOne')}%
                                        </p>
                                    </div>
                                    <div>
                                        <p className={optionTwo.votes.includes(authedUser) ? `voted` : ''}>
                                            {optionTwo.text} ➡ {this.getPercentage(question, 'optionTwo')}%
                                        </p>
                                    </div>
                                </Fragment>) : (
                                <Fragment>
                                    <button onClick={this.getHandleVote('optionOne')}>{optionOne.text}</button>
                                    <button onClick={this.getHandleVote('optionTwo')}>{optionTwo.text}</button>
                                </Fragment>
                            )
                        ) : (
                            <Link to={`/question/${id}`} className='btn'>View poll</Link>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({questions, authedUser, users}, {id, voteable = false}) {
    const question = questions[id];

    return {
        question: question,
        author: users[question.author],
        alreadyVoted: question.optionOne.votes.concat(question.optionTwo.votes).includes(authedUser),
        voteable,
        authedUser
    }
}

export default connect(mapStateToProps)(Poll);
