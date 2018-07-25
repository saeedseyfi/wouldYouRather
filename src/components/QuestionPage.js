import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Poll from 'components/Poll';

class QuestionPage extends React.Component {
    render() {
        const {question} = this.props;

        return (
            <div>
                {question ? (
                    <Poll id={question.id} voteable={true}/>
                ) : (
                    <h1>404 :( Question not found...</h1>
                )}
            </div>
        )
    }
}

function mapStateToProps({questions = {}}, {match}) {
    return {
        question: questions[match.params.id]
    }
}

export default withRouter(connect(mapStateToProps)(QuestionPage));
