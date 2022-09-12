import React, {Component} from "react";
import styles from './registration.module.scss';
import {Link, Navigate} from "react-router-dom";

export class Registration extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirmedPassword: '',
        clicked: false,
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
        this.setState({clicked: true})

        fetch("https://internsapi.public.osodsadra.ru/api/auth/signup123123", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.confirmedPassword
            })
        }).catch(e => {
            console.error(e.message);
        }).then( () => {
            this.setState({clicked: false})
        });
    }

    render() {

        if (localStorage.getItem('accessToken')) {
            return <Navigate to='/profile' replace/>
        }

        return (
            <section className={styles.section}>
                <h1>Регистрация</h1>
                <form onSubmit={this.submitHandler} className={styles.form}>
                    <input className={styles.input} type="text" placeholder={'Введите имя'}
                           onChange={this.loginHandler}/>
                    <input className={styles.input} type="email" placeholder={'Введите почту'}
                           onChange={this.emailHandler}/>
                    <input className={styles.input} type="text" placeholder={'Введите пароль'}
                           onChange={this.passwordHandler}/>
                    <input className={styles.input} type="text" placeholder={'Подтвердите пароль'}
                           onChange={this.comparePasswordHandler}/>
                    <input className={styles.input} disabled={this.state.clicked} type="submit" value={'Зарегистрироваться'}/>
                </form>

                <Link to='/authorization' className={styles.link}>К авторизации</Link>
            </section>
        )
    }
}
