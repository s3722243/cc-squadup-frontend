import React, { Component } from "react";


export default class NotFound extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3 className="title is-3">Page not found!</h3>
                </header>
            </div>
        );
    }
}
