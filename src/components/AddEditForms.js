import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';

class AddEditForms extends Component {
    constructor(props) {
        super(props);

        let users = JSON.parse(localStorage.getItem('users')) || {};
        let userId = this.props.match.params.id;
        let fields;

        if (this.props.match.path === '/add') {
            fields = {
                full_name: '',
                birth_day: '',
                birth_month: '',
                birth_year: '',
                address: '',
                city: '',
                phone: ''
            };
        } else {
            fields = users[userId];
        }

        this.state = {
            fields: fields,
            errors: {},
            submitted: false,
            users: users,
            userId: userId
        }
    }

    handleValidation(fields) {
        let errors = {};
        let formIsValid = true;

        //full_name
        if (!fields["full_name"]) {
            formIsValid = false;
            errors["full_name"] = "Это поле обязательно к заполнению";
        }

        if (fields["full_name"].length > 100) {
            formIsValid = false;
            errors["full_name"] = "это поле содержит не более 100 символов";
        }

        //birthday
        if (!fields["birth_day"]) {
            formIsValid = false;
            errors["birth_day"] = "Это поле обязательно к заполнению";
        }

        if (!fields["birth_month"]) {
            formIsValid = false;
            errors["birth_month"] = "Это поле обязательно к заполнению";
        }

        if (!fields["birth_year"]) {
            formIsValid = false;
            errors["birth_year"] = "Это поле обязательно к заполнению";
        }

        //phone
        if (fields["phone"] && !fields["phone"].match(/^(\+7|007)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/)) {
            formIsValid = false;
            errors["phone"] = "Недопустимый номер телефона";
        }

        errors["form_is_valid"] = formIsValid;

        return errors;
    }

    uniqueId() {
        return Math.random().toString(36).substr(2, 8);
    }

    formSubmit(e) {
        e.preventDefault();
        let fields = this.state.fields;
        let errors = this.handleValidation(fields);

        if (errors["form_is_valid"]) {
            let id = this.props.match.path === '/add' ? this.uniqueId() : this.state.userId;
            let users = this.state.users;
            users[id] = fields;
            localStorage.setItem('users', JSON.stringify(users));
            this.props.history.push('/show/' + id);
        } else {
            this.setState({submitted: true, errors: errors});
        }

    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;

        if (this.state.submitted && ['full_name', 'birth_day', 'birth_month', 'birth_year', 'phone'].includes(field)) {
            let errors = this.handleValidation(fields);
            this.setState({fields, errors: errors});
        } else {
            this.setState({fields});
        }
    }

    getDays() {
        const days = [];
        for (let i = 1; i < 32; i++) {
            let selected = this.state.fields["birth_day"] == i ? 'selected' : '';
            days.push(<option selected={selected} key={i} value={i}>{i}</option>);
        }
        return days;
    }

    getMonths() {
        const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        return months.map((month, index) => {
            let selected = this.state.fields["birth_month"] === month ? 'selected' : '';
            return (
                <option selected={selected} key={index} value={month}>{month}</option>
            );
        });
    }

    getYears() {
        const years = [];
        for (let i = (new Date()).getFullYear(); i > 1899; i--) {
            let selected = this.state.fields["birth_year"] == i ? 'selected' : '';
            years.push(<option selected={selected} key={i} value={i}>{i}</option>);
        }
        return years;
    }

    render() {
        let button;
        let title;

        if (this.props.match.path === '/add') {
            button = <button className="btn btn-success">Добавить</button>;
            title = <h1 className="text-center">Добавление данных</h1>;
        } else {
            if(!this.state.fields){
                return <Redirect to='/' />;
            }
            button = <button className="btn btn-primary">Обновить</button>;
            title = <h1 className="text-center">Редактирование данных</h1>;
        }

        return (
            <div className="container">
                <header className="bg-light clearfix">
                    {title}
                    <Link className="btn float-left" to={"/"}>Пользователей</Link>
                </header>
                <form onSubmit={this.formSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="full_name">ФИО (не больше 100 символов) *</label>
                        <input type="text"
                               className={this.state.errors["full_name"] ? 'form-control is-invalid' : 'form-control'}
                               id="full_name" maxLength="100" onChange={this.handleChange.bind(this, "full_name")}
                               value={this.state.fields["full_name"]}/>
                        <div className="invalid-feedback">{this.state.errors["full_name"]}</div>
                    </div>
                    <fieldset>
                        <legend align="center">Дата рождения *</legend>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="birth_day">День</label>
                                <select id="birth_day"
                                        className={this.state.errors["birth_day"] ? 'form-control is-invalid' : 'form-control'}
                                        onChange={this.handleChange.bind(this, "birth_day")}>
                                    <option key="0" value="">Выберите</option>
                                    {this.getDays()}
                                </select>
                                <div className="invalid-feedback">{this.state.errors["birth_day"]}</div>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="birth_month">Месяц</label>
                                <select id="birth_month"
                                        className={this.state.errors["birth_month"] ? 'form-control is-invalid' : 'form-control'}
                                        onChange={this.handleChange.bind(this, "birth_month")}>
                                    <option key="00" value="">Выберите</option>
                                    {this.getMonths()}
                                </select>
                                <div className="invalid-feedback">{this.state.errors["birth_month"]}</div>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="birth_year">Год</label>
                                <select id="birth_year"
                                        className={this.state.errors["birth_year"] ? 'form-control is-invalid' : 'form-control'}
                                        onChange={this.handleChange.bind(this, "birth_year")}>
                                    <option key="0" value="">Выберите</option>
                                    {this.getYears()}
                                </select>
                                <div className="invalid-feedback">{this.state.errors["birth_year"]}</div>
                            </div>
                        </div>
                    </fieldset>
                    <div className="form-group">
                        <label htmlFor="address">Адрес</label>
                        <input type="text" className="form-control" id="address"
                               onChange={this.handleChange.bind(this, "address")} value={this.state.fields["address"]}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Город</label>
                        <input type="text" className="form-control" id="city"
                               onChange={this.handleChange.bind(this, "city")} value={this.state.fields["city"]}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Телефон (российский мобильный)</label>
                        <input type="text"
                               className={this.state.errors["phone"] ? 'form-control is-invalid' : 'form-control'}
                               placeholder="+7" id="phone" onChange={this.handleChange.bind(this, "phone")}
                               value={this.state.fields["phone"]}/>
                        <div className="invalid-feedback">{this.state.errors["phone"]}</div>
                    </div>
                    {button}

                </form>
            </div>
        );
    }

}

export default AddEditForms;
