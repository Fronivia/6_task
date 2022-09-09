import React, {Component} from "react";
import Test from "../Test/Test";
import {Statistics} from "../Statistics/Statistics";
import {Navigate} from "react-router-dom";

export class Profile extends Component {
    render() {

        if (!localStorage.getItem('accessToken')) {
            return <Navigate to='/' replace/>
        }

        return (
            <>
                <Statistics/>
                <Test/>
            </>
        )
    }
}
