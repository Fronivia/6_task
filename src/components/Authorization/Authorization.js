import React, {Component} from "react";
import styles from './authorization.module.scss';
import {withRouter} from "../../hocs/withRouter";
import {Link, Navigate} from "react-router-dom";

class Authorization extends Component {

    state = {
        email: '',
        password: '',
        clicked: false
    };

    emailHandler = (event) => {
        this.setState({email: event.target.value})
    }

    passwordHandler = (event) => {
        this.setState({password: event.target.value})
    }

    submitHandler = async (event) => {
        event.preventDefault();
        fetch("https://internsapi.public.osora.ru/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        }).then((response) => response.json())
            .then((data) => {
                if (data.status) {
                    localStorage.setItem('accessToken', data.data.access_token);
                    this.props.navigate('/profile');
                } else {
                    throw new Error('Вы не авторизировались')
                }
            })
            .catch(e => {
                console.error(e.message);
            });
    }

    render() {

        if (localStorage.getItem('accessToken')) {
            return <Navigate to='/profile' replace/>
        }

        return (
            <section className={styles.section}>
                <h1>Авторизация</h1>
                <form className={styles.form} onSubmit={this.submitHandler}>
                    <input className={styles.input} type="email" placeholder={'Введите почту'} onChange={this.emailHandler}/>
                    <input className={styles.input} type="password" placeholder={'Введите пароль'} onChange={this.passwordHandler}/>
                    <input className={styles.input} disabled={this.state.clicked} type="submit" value={'Авторизация'}/>
                </form>
                <Link to='/' className={styles.link}>К регистрации</Link>
            </section>
        )
    }
}

export default withRouter(Authorization);
