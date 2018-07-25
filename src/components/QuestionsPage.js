import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import Poll from 'components/Poll';

class QuestionsPage extends React.Component {
    static view = {
        UNANSWERED: 'UNANSWERED',
        ANSWERED: 'ANSWERED'
    };

    state = {
        view: QuestionsPage.view.UNANSWERED,
        questions: Object.keys(this.props.questions)
            .map(id => this.props.questions[id])
            .filter(q => !q.optionOne.votes.concat(q.optionTwo.votes).includes(this.props.authedUser))
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(q => q.id)
    };

    handleChangeView = (e) => {
        this.setState({
            view: e.target.name,
            questions: Object.keys(this.props.questions)
                .map(id => this.props.questions[id])
                .filter(q => QuestionsPage.view.ANSWERED && q.optionOne.votes.concat(q.optionTwo.votes).includes(this.props.authedUser) ? e.target.name === QuestionsPage.view.ANSWERED : e.target.name === QuestionsPage.view.UNANSWERED)
                .sort((a, b) => b.timestamp - a.timestamp)
                .map(q => q.id)
        })
    };

    render() {
        const {view, questions} = this.state;

        return (
            <Fragment>
                <div className='connected'>
                    <button
                        onClick={this.handleChangeView}
                        name={QuestionsPage.view.UNANSWERED}
                        className={view === QuestionsPage.view.UNANSWERED ? 'selected' : ''}
                    >
                        Unanswered
                    </button>

                    <button
                        onClick={this.handleChangeView}
                        name={QuestionsPage.view.ANSWERED}
                        className={view === QuestionsPage.view.ANSWERED ? 'selected' : ''}
                    >
                        Answered
                    </button>
                </div>

                {questions.length ? (
                        <ul>
                            {questions.map(id => (
                                <li key={id}>
                                    <Poll id={id} voteable={view === QuestionsPage.view.ANSWERED}/>
                                </li>
                            ))}
                        </ul>)
                    : (
                        <h2>No questions in this section :)</h2>
                    )}
            </Fragment>
        )
    }
}

function mapStateToProps({questions, authedUser}) {
    return {
        questions,
        authedUser
    }
}

export default connect(mapStateToProps)(QuestionsPage);
