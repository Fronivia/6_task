// import React, {Component} from "react";
// import {Route, Navigate} from "react-router-dom";
// import Authorization from "../Authorization/Authorization";
//
// export class PrivateRoute extends Component {
//     render() {
//         return (
//                 <Route
//                     path={this.props.path}
//                     render={(props) => {
//                         const token = localStorage.getItem('accessToken');
//
//                         if (token) {
//                             const Cmp = this.props.element
//                             return <Cmp {...props}/>
//                         }
//
//                         return <Navigate to='/authorization' replace/>
//                     }}
//                 />
//         )
//     }
// }
