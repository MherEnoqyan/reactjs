import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {

    constructor(props) {
        super(props);
        let users = JSON.parse(localStorage.getItem('users')) || {};
        this.state = {
            users: users
        }
    }

    handleDelete(id, e) {
        let users = this.state.users;
        delete users[id];
        localStorage.setItem('users', JSON.stringify(users));
        this.setState({users: users});
    }

    getList() {
        const list = [];
        let users = this.state.users;
        Object.keys(users).forEach(function (key) {
            list.push(
                <li key={key} className="list-group-item">
                    <Link to={"/show/" + key}>{users[key]["full_name"]}</Link>
                    <Link className="btn btn-primary float-right" to={"/edit/" + key}>Обновить</Link>
                    <button onClick={this.handleDelete.bind(this, key)} className="btn btn-danger float-right mr-2">
                        Удалить
                    </button>
                </li>
            );
        }, this);

        return list;
    }

    render() {
        return (
            <div className="container">
                <header className="bg-light">
                    <h1 className="text-center">Пользователей</h1>
                </header>
                <Link className="btn btn-success my-2" to="/add">Добавить</Link>
                <ul className="list-group">
                    {this.getList()}
                </ul>
            </div>
        );
    }


}

export default Home;
