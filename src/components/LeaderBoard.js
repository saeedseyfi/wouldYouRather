import React from 'react';
import {connect} from 'react-redux';

const getUseVotes = (u) => Object.keys(u.answers).length + u.questions.length;

class LeaderBoard extends React.Component {
    render() {
        const {users} = this.props;

        return (
            <div>
                <h1>Leader board</h1>

                <ul>
                    {users.map(u => (
                        <li key={u.id} className='user'>
                            <div className='avatar'>
                                <img alt={`${u.name}'s avatar`} src={u.avatarURL} width={88}/>
                            </div>

                            <div className='stats'>
                                <h2>
                                    {u.name}
                                </h2>
                                <p>
                                    answers: {Object.keys(u.answers).length}
                                    <br/>
                                    questions: {u.questions.length}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({users}) {
    return {
        users: Object.keys(users)
            .map(id => users[id])
            .filter(u => getUseVotes(u) > 0)
            .sort((a, b) => getUseVotes(b) - getUseVotes(a))
    }
}

export default connect(mapStateToProps)(LeaderBoard);