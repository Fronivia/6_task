import React, {Component} from "react";
import styles from './registration.module.scss';

export class Registration extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirmedPassword: '',
    };

    loginHandler = (event) => {
        this.setState({name: event.target.value})
    }

    emailHandler = (event) => {
        this.setState({email: event.target.value})
    }

    passwordHandler = (event) => {
        this.setState({password: event.target.value})
    }

    comparePasswordHandler = (event) => {
        this.setState({confirmedPassword: event.target.value})
    }

    submitHandler = async (event) => {
        event.preventDefault();
        console.log(this.state.password)
        console.log(this.state.confirmedPassword)
        const response = fetch("https://internsapi.public.osora.ru/api/auth/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.confirmedPassword
            })
        }).then((response) => response.json())
            .then((data) => {
                console.log('This is your data', data)
            });
    }

    render() {
        return(
            <>
                <h1>Регистрация</h1>
                <form onSubmit={this.submitHandler} className={styles.form}>
                    <input type="text" placeholder={'Введите имя'} onChange={this.loginHandler}/>
                    <input type="email" placeholder={'Введите почту'} onChange={this.emailHandler}/>
                    <input type="text" placeholder={'Введите пароль'} onChange={this.passwordHandler}/>
                    <input type="text" placeholder={'Подтвердите пароль'} onChange={this.comparePasswordHandler}/>
                    <input type="submit" value={'Зарегистрироваться'}/>
                </form>
            </>
        )
    }
}
// Artem
// artemTestovoe@gmail.ru
// Qwerty12345
// 123
// 123
