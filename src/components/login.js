import React, { Component } from "react";
import { navigate } from "@reach/router";
import axios from "axios";

export default class Login extends Component {
    state = {
        username: "",
        password: "",
        error: false,
        errorMessage: ""
    };
    handleInputChange = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };
    handleLogin = e => {
        e.preventDefault();
        const { username, password } = this.state;
        axios
            .post("http://139.162.2.53:7077/login", {
                username,
                password
            })
            .then(response => {
                const res = response.data;
                if (res.success) {
                    sessionStorage.setItem("token", res.token);
                    navigate("dashboard");
                } else {
                    this.setState({
                        error: true,
                        errorMessage: res.message
                    });
                }
            })
            .catch(err => {
                console.log("Error logging in: ", err);
            });
    };
    render() {
        const { username, password, error, errorMessage } = this.state;
        return (
            <div className="container-fluid d-flex justify-content-center align-items-center">
                <div className="row">
                    <div className="col-12">
                        <div className="card" style={{ width: "18rem", marginTop: "10rem" }}>
                            <h2 className="card-header">Login</h2>
                            <form onSubmit={this.handleLogin}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={username}
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={password}
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                    {error && (
                                        <div className="alert alert-danger">{errorMessage}</div>
                                    )}
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
