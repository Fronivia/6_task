import React, {Component} from "react";
import styles from './test.module.scss';
import {withRouter} from "../../hocs/withRouter";

class Test extends Component {

    state = {
        data: {},
    }

    selectHandler = (event) => {

        fetch(`https://internsapi.public.osora.ru/api/game/play`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                type_hard: event.target.value,
                type: 1,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (+event.target.value === 1) {
                    this.props.navigate('/question', {
                        state: {
                            data: data.data,
                            type_hard: event.target.value
                        }
                    })
                } else {
                    this.props.navigate('/hard_question', {
                        state: {
                            data: data.data,
                            type_hard: event.target.value
                        }
                    })
                }

            })
            .catch(e => {
                throw new Error(e.message);
            })
    }

    render() {
        return (
            <section className={styles.section}>
                <h2>Тест</h2>
                <select className={styles.select} onChange={this.selectHandler} defaultValue={'Выберите сложность'}>
                    <option value="1">Easy/Легко</option>
                    <option value="2">Hard/Сложно</option>
                    <option disabled>Выберите сложность</option>
                </select>
            </section>
        )
    }
}

export default withRouter(Test);
