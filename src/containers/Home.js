import React from "react";
import useCurrentUser from "../hooks/UseCurrentUser";

export default function Home() {
    const currentUser = useCurrentUser();

    return (
        <div className="container">
            <header className="jumbotron">
                <h3 className="title is-3">Welcome to SquadUp!</h3>
            </header>
            {currentUser ?
                <p>Currently logged in as {currentUser.getUsername()}</p> :
                <p>Login to get started!</p>
            }
        </div>
    );
}