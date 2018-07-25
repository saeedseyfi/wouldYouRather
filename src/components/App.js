import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import {connect} from 'react-redux';
import Nav from 'components/Nav';
import QuestionsPage from 'components/QuestionsPage';
import QuestionPage from 'components/QuestionPage';
import NewQuestion from 'components/NewQuestion';
import LeaderBoard from 'components/LeaderBoard';
import {withAuthenticate} from 'components/Authenticate';
import {handleInitialData} from 'actions/shared';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        const {loading} = this.props;

        return (
            <BrowserRouter>
                <Fragment>
                    <LoadingBar/>

                    <Nav/>

                    <main>
                        {!loading && (
                            <Fragment>
                                <Route
                                    exact
                                    path='/'
                                    render={withAuthenticate(QuestionsPage)}
                                />
                                <Route
                                    path='/question/:id'
                                    render={withAuthenticate(QuestionPage)}
                                />
                                <Route
                                    path='/add'
                                    render={withAuthenticate(NewQuestion)}
                                />
                                <Route
                                    path='/leaderboard'
                                    render={withAuthenticate(LeaderBoard)}
                                />
                            </Fragment>
                        )}
                    </main>
                </Fragment>
            </BrowserRouter>
        );
    }
}

function mapStateToProps({questions, users}) {
    return {
        loading: !(questions && users)
    }
}

export default connect(mapStateToProps)(App);