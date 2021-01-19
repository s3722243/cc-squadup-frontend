import { Component } from "react";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>Welcome to SquadUp!</h3>
                </header>
            </div>
        );
    }
}