import React, { useState } from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";
import "bulma/css/bulma.min.css";
import 'bulmaswatch/darkly/bulmaswatch.min.css'
import './App.css';
import Routes from "./Routes";
import Auth from "@aws-amplify/auth"
import aws_exports from './aws-exports';
import useCurrentUser from "./hooks/UseCurrentUser";

Auth.configure(aws_exports);

function App() {

    const [isActiveHamburger, setActiveHamburger] = useState(false);
    const currentUser = useCurrentUser();

    function logout() {

    }

    return (
        <Router>
            <div>
                <nav className="navbar">
                    <div className="container">
                        <div className="navbar-brand">
                            <Link to={"/"} className="navbar-item brand-text">
                                SquadUp
                            </Link>
                            <div
                                className={`navbar-burger burger ${isActiveHamburger ? "is-active" : ""}`}
                                onClick={() => setActiveHamburger(!isActiveHamburger)}
                                data-target="navMenu"
                            >
                                <span/>
                                <span/>
                                <span/>
                            </div>
                        </div>
                        <div id="navMenu" className={`navbar-menu ${isActiveHamburger ? "is-active" : ""}`}>
                            <div className="navbar-start">
                                <Link to={"/about"} className="navbar-item">
                                    About us
                                </Link>

                                <Link to={"/contact"} className="navbar-item">
                                    Contact us
                                </Link>
                            </div>

                            {currentUser ? (
                                <div className="navbar-end">
                                    <Link to={"/profile"} className="navbar-item">
                                        {currentUser.username}
                                    </Link>
                                    <Link className="navbar-item" onClick={() => logout}>
                                        Logout
                                    </Link>
                                </div>
                            ) : (
                                <div className="navbar-end">
                                    <Link to={"/login"} className="navbar-item">
                                        Login
                                    </Link>
                                    <Link to={"/register"} className="navbar-item">
                                        Register
                                    </Link>
                                </div>
                            )}
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

export default App;
