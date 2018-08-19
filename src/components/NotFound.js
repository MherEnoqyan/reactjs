import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NotFound extends Component {

    render() {
        return (
            <div className="container text-center">
                <h1>404</h1>
                <h1>Страница не найдена</h1>
                <p><Link to="/">Вернуться к пользователям</Link></p>
            </div>
        );
    }
}

export default NotFound;
