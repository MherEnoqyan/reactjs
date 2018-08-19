import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';

class Show extends Component {
    constructor(props) {
        super(props);
        let users = JSON.parse(localStorage.getItem('users')) || {};
        let userId = this.props.match.params.id;
        let fields = users[userId];

        this.state = {
            fields: fields
        }
    }

    render() {
        if(!this.state.fields){
            return <Redirect to='/'/>;
        }
        return (
            <div className="container text-center">
                <header className="bg-light clearfix">
                    <h1>{this.state.fields['full_name']}</h1>
                    <Link className="btn float-left" to={"/"}>Пользователей</Link>
                </header>
                <p>Дата рождения
                    : {this.state.fields['birth_day'] + '/' + this.state.fields['birth_month'] + '/' + this.state.fields['birth_year']}</p>
                {this.state.fields['address'] ? <p>Адрес : {this.state.fields['address']}</p> : ''}
                {this.state.fields['city'] ? <p>Город : {this.state.fields['city']}</p> : ''}
                {this.state.fields['phone'] ? <p>Телефон : {this.state.fields['phone']}</p> : ''}
            </div>
        );
    }


}

export default Show;
