import React from "react";
import {Route, Switch} from "react-router-dom";
import About from "./containers/About";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Find from "./containers/Find";
import Register from "./containers/Register";

export default function Routes() {
    return (
        <Switch>
            <Route exact path={"/"} component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/find" component={Find}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route component={NotFound}/>
        </Switch>
    );
}