import React, {Component} from "react";
import styles from './hardQuestion.module.scss';
import {withRouter} from "../../hocs/withRouter";
import {Link, Navigate} from "react-router-dom";

class HardQuestion extends Component {

    state = {
        timer: this.props.location.state.data.time, clicked: false,
    }

    componentDidMount() {
        const id = setInterval(() => {

            if (this.state.timer === 0) {
                return clearInterval(id);
            }

            if (this.state.clicked) return;

            this.setState(prev => ({timer: prev.timer - 1}));
        }, 1000)
    }

    sendAnswer = (event) => {
        event.preventDefault();
        this.setState({clicked: true});
        fetch('https://internsapi.public.osora.ru/api/game/play', {
            method: 'POST', headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }, body: JSON.stringify({
                'answer': this.state.answer, 'type_hard': this.props.location.state.type_hard, type: 2,
            })
        })
            .then(response => response.json())
            .then(data => {

                this.setState({
                    clicked: false, timer: data.data.time,
                })

                if (data.data.status !== 1) {
                    this.props.navigate(`/hard_question`, {
                        state: {
                            data: data.data, type_hard: this.props.location.state.type_hard
                        }
                    });
                } else {
                    this.props.navigate('/result', {
                        state: {
                            data: data.data
                        }
                    })
                }

            }).catch(e => {
                throw new Error(e.message);
        });
    }

    inputHandler = (event) => {
        this.setState({answer: event.target.value})
    }

    render() {
        const locationState = this.props.location.state;

        if (!locationState) {
            return <Navigate to='/authorization' replace/>
        }
        return (<div className={styles.test_container}>
                <p className={styles.info}>
                    Score:
                    <span className={styles.info_count}>{locationState.data.points}</span>
                </p>

                <p className={styles.info}>
                    Timer:
                    <span className={styles.info_count}>
                        {this.state.timer}
                    </span>
                </p>

                <h3 className={styles.info}>{locationState.data.question} = ?</h3>
                {this.state.timer === 0 ? <h2>Время кончилось</h2> :
                    <form className={styles.buttons_container} onSubmit={this.sendAnswer}>
                        <input className={styles.input} type="text" onChange={this.inputHandler} disabled={this.state.clicked}/>
                        <input className={styles.input} type="submit" value="Отправить" disabled={this.state.clicked}/>
                    </form>}
                <Link to='/profile' className={styles.link}>Go back</Link>
            </div>)
    }
}

export default withRouter(HardQuestion);
