import React, {Component} from "react";
import styles from './question.module.scss';
import {withRouter} from "../../hocs/withRouter";
import {Link, Navigate} from "react-router-dom";

class Question extends Component {

    state = {
        timer: this.props.location.state?.data.time || 0, clicked: false,
    }

    componentDidMount() {

        const id = setInterval(() => {

            if (this.state.timer === 0) {
                return clearInterval(id)
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
                'answer': event.target.value, 'type_hard': this.props.location.state.type_hard, type: 2,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.data.status !== 1) {
                    this.setState({
                        clicked: false, timer: data.data.time,
                    })

                    this.props.navigate(`/question`, {
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
            })
            .catch(e => {
                throw new Error(e.message)
            });
    }

    renderOptions(options) {
        return options.map(option => <button
            value={option}
            onClick={this.sendAnswer}
            className={styles.button}
            key={option}
            disabled={this.state.clicked}
        >
            {option}
        </button>)
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
            {this.state.timer <= 0 ? <h2>Время кончилось</h2> : <div className={styles.buttons_container}>
                {this.renderOptions(locationState.data.options)}
            </div>}
            <Link to='/profile' className={styles.link}>Go back</Link>
        </div>)
    }
}

export default withRouter(Question);
