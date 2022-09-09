import React, {Component} from "react";
import styles from './authorization.module.scss';
import {withRouter} from "../../hocs/withRouter";

class Authorization extends Component {

    state = {
        email: '',
        password: '',
    };

    emailHandler = (event) => {
        this.setState({email: event.target.value})
    }

    passwordHandler = (event) => {
        this.setState({password: event.target.value})
    }

    submitHandler = async (event) => {
        event.preventDefault();
        const response = fetch("https://internsapi.public.osora.ru/api/auth/login", {
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
                    localStorage.setItem('accessToken', data.data.access_token)
                    this.props.navigate('/profile');
                } else {
                    throw new Error('Вы не авторизировались')
                }
            });
    }

    render() {
        return (
            <>
                <h1>Авторизация</h1>
                <form className={styles.form} onSubmit={this.submitHandler}>
                    <input type="email" placeholder={'Введите почту'} onChange={this.emailHandler}/>
                    <input type="password" placeholder={'Введите пароль'} onChange={this.passwordHandler}/>
                    <input type="submit" value={'Авторизация'}/>
                </form>
            </>
        )
    }
}

export default withRouter(Authorization);
