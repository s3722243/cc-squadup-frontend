import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link, withRouter} from "react-router-dom";
import "bulma/css/bulma.min.css";
import 'bulmaswatch/darkly/bulmaswatch.min.css'
import './App.css';
import Routes from "./Routes";

class App extends Component {
    constructor(props) {
        super(props);
        this.handleEvent = this.handleEvent.bind(this);

        this.state = {
            currentUser: undefined,
            activeHamburger: false,
        };
    }

    handleEvent() {
        this.setState({activeHamburger: !this.state.activeHamburger});
    }


    render() {
        return (
            <Router>
                <div>
                    <nav className="navbar">
                        <div class="container">
                            <div class="navbar-brand">
                                <Link to={"/"} className="navbar-item brand-text">
                                    SquadUp
                                </Link>
                                <div
                                    class={`navbar-burger burger ${this.state.activeHamburger ? "is-active" : ""}`}
                                    onClick={this.handleEvent}
                                    data-target="navMenu"
                                >
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div id="navMenu" class={`navbar-menu ${this.state.activeHamburger ? "is-active" : ""}`}>
                                <div class="navbar-start">
                                    <Link to={"/about"} className="navbar-item">
                                        About us
                                    </Link>

                                    <Link to={"/contact"} className="navbar-item">
                                        Contact us
                                    </Link>
                                </div>

                                {/*{currentUser ? (*/}
                                {/*    <div className="navbar-end">*/}
                                {/*        <Link to={"/profile"} className="navbar-item">*/}
                                {/*            {currentUser.username}*/}
                                {/*        </Link>*/}
                                {/*        <Link className="navbar-item" onClick={this.logout}>*/}
                                {/*            Logout*/}
                                {/*        </Link>*/}
                                {/*    </div>*/}
                                {/*) : (*/}
                                {/*    <div className="navbar-end">*/}
                                {/*        <Link to={"/login"} className="navbar-item">*/}
                                {/*            Login*/}
                                {/*        </Link>*/}
                                {/*        <Link to={"/register"} className="navbar-item">*/}
                                {/*            Register*/}
                                {/*        </Link>*/}
                                {/*    </div>*/}
                                {/*)}*/}
                            </div>

                        </div>
                    </nav>
                    <div className="container mt-3">
                        <Routes/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default withRouter(App);
