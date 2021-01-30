import React, {useState} from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";
import "bulma/css/bulma.min.css";
import 'bulmaswatch/darkly/bulmaswatch.min.css'
import "@creativebulma/bulma-divider/dist/bulma-divider.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import './App.css';
import Routes from "./Routes";
import Auth from "@aws-amplify/auth"
import aws_exports from './aws-exports';
import useCurrentUser from "./hooks/UseCurrentUser";

Auth.configure(aws_exports);

function App() {

    const [isActiveHamburger, setActiveHamburger] = useState(false);
    const currentUser = useCurrentUser();

    async function logout() {
        await Auth.signOut();
        window.location.reload(true);
    }

    return (
        <Router>
            <nav className="navbar" style={{backgroundColor: "#39434d"}}>
                <div className="container">
                    <div className="navbar-brand">
                        <Link to={"/"} className="navbar-item" style={{fontWeight: "bold"}}>
                            <p className="title" style={{fontWeight: "bold"}}>SquadUp</p>
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
                                About
                            </Link>

                            {currentUser &&
                            <Link to={"/find"} className="navbar-item">
                                Find players
                            </Link>
                            }
                        </div>

                        {currentUser ? (
                            <div className="navbar-end">
                                <Link to={"/profile"} className="navbar-item">
                                    {currentUser.username}
                                </Link>
                                <Link to={"/"} className="navbar-item" onClick={logout}>
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
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        <strong>SquadUp</strong> by Lachlan Furlong (s3722243) and Jeffin Poovely (s3656024) - RMIT Cloud
                        Computing, Summer semester 2021. Video-game data and images sourced using <a href="https://rawg.io">RAWG
                        API</a>.
                    </p>
                </div>
            </footer>
        </Router>
    );
}

export default App;
