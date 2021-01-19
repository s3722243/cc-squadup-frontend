import React from "react";
import {Route, Switch} from "react-router-dom";
import About from "./containers/About";
import Contact from "./containers/Contact";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";

export default function Routes() {
    return (
        <Switch>
            <Route exact path={"/"} component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/contact" component={Contact}/>
            <Route component={NotFound}/>
        </Switch>
    );
}