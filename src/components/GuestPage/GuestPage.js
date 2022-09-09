import React, {Component} from "react";
import {Registration} from "../Registration/Registration";
import Authorization from "../Authorization/Authorization";
import styles from './guestPage.module.scss'

export class GuestPage extends Component {
    render() {
        return (
            <section className={styles.section}>
                <Authorization/>
                <Registration/>
            </section>
        )
    }
}
