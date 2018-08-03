import React, { Component } from "react";
import { Router } from "@reach/router";

import Login from "./components/login";
import Dashboard from "./components/dashboard";

const Routes = () => (
    <Router>
        <Login path="login" />
        <Dashboard path="dashboard" />
    </Router>
);

export default Routes;
