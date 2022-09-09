import React, {Component} from "react";
import {Test} from "../Test/Test";
import {Statistics} from "../Statistics/Statistics";

export class Profile extends Component {
    render() {
        console.log('here')
        return(
            <>
                <Statistics/>
                <Test/>
            </>
        )
    }
}
