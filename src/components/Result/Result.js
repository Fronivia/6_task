import React, {Component} from "react";
import {withRouter} from "../../hocs/withRouter";
import styles from './result.module.scss'
import {Link, Navigate} from "react-router-dom";

class Result extends Component {

    renderTable = () => {
        return this.props.location.state.data.questions.map((question, index) => {
            return (
                <div className={styles.row} key={question.question + question.answer + question.current_answer + index}>
                    <div className={styles.question}>{question.question}</div>
                    <div className={styles.answer}>{question.answer}</div>
                    <div className={styles.correct}>{question.current_answer}</div>
                </div>
            )
        })
    }

    render() {

        const locationState = this.props.location.state;

        if (!locationState) {
            return <Navigate to='/authorization' replace/>
        }

        return (
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.question}>Question</div>
                        <div className={styles.answer}>Answer</div>
                        <div className={styles.correct}>Correct</div>
                    </div>
                    {this.renderTable()}
                </div>
                <Link to="/profile" className={styles.link}>Back</Link>
            </section>
        )
    }
}

export default withRouter(Result);
