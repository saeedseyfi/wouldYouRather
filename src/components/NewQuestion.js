import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {handleAddQuestion} from 'actions/questions';
import {userAddQuestion} from 'actions/users';

class NewQuestion extends React.Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        questionAdded: false
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {dispatch, authedUser} = this.props;
        const {optionOneText, optionTwoText} = this.state;

        dispatch(handleAddQuestion(optionOneText, optionTwoText, authedUser))
            .then((q) => {
                dispatch(userAddQuestion(authedUser, q.id));
                this.setState({questionAdded: true});
            });
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        const {questionAdded} = this.state;
        const {optionOneText, optionTwoText} = this.props;

        if (questionAdded) {
            return <Redirect to='/'/>
        }

        return (
            <div>
                <h1>New question</h1>

                <h2>Would you rather?</h2>

                <form onSubmit={this.handleSubmit}>
                    <input
                        autoComplete='off'
                        placeholder='Option one'
                        name='optionOneText'
                        onChange={this.handleChange}
                        value={optionOneText}/>

                    <input
                        autoComplete='off'
                        placeholder='Option two'
                        name='optionTwoText'
                        onChange={this.handleChange}
                        value={optionTwoText}/>

                    <button>Add question</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {authedUser}
}

export default connect(mapStateToProps)(NewQuestion);