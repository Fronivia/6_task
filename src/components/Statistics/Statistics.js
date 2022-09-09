import React, {Component} from "react";
import styles from './statistics.module.scss';

export class Statistics extends Component {

    state = {
        points: 'Идет загрузка'
    }

    getPoints() {
        fetch('https://internsapi.public.osora.ru/api/game/lobby', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },

        })
            .then(res => res.json())
            .then(data => {
                this.setState({points: data.data.points})
            })
            .catch(e => {
                throw new Error(e.message)
            })
    }

    componentDidMount() {
        this.getPoints();
    }

    render() {
        return (
            <section className={styles.section}>
                <h1>Congratulations, Username! Your score:</h1>
                <h2 className={styles.score}>{this.state.points}</h2>
            </section>
        )
    }
}
