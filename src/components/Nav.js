import React from 'react';
import UserInfo from 'components/UserInfo';
import {Link} from 'react-router-dom';

export default function Nav() {
    return (
        <header>
            <div>
                <nav>
                    <ul>
                        <li><Link to='/'>Questions</Link></li>
                        <li><Link to='/add'>Add Question</Link></li>
                        <li><Link to='/leaderboard'>Leader Board</Link></li>
                    </ul>
                </nav>

                <UserInfo/>
            </div>
        </header>
    )
}
