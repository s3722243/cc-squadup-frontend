import useCurrentUser from "../hooks/UseCurrentUser";
import RecentlyPlayedGames from "./RecentlyPlayedGames";

export default function Find() {
    const currentUser = useCurrentUser();

    function selectGame(game) {
        console.log(game.id);
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="title">Find players</h1>
                <hr/>

            </header>
            {currentUser ? (
                <div className="container mt-3">
                    <div className="columns">
                        <div className="column is-4 ">
                            <div className="card">
                                <div className="card-content">
                                    <div className="content">
                                        <div className="control has-icons-left">
                                            <input className="input" type="text" placeholder="Search games"/>
                                            <span className="icon is-left"><i className="fa fa-search"/></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-table">
                                    <div className="content">
                                        <table className="table is-fullwidth is-striped">
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <RecentlyPlayedGames selectedCallback={selectGame}/>
                            <div className="card mt-3">
                                <header className="card-header">
                                    <p className="card-header-title">Popular games</p>
                                </header>
                                <div className="card-table">
                                    <div className="content">
                                        <table className="table is-fullwidth is-striped">
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-8 ">
                            <div className="card">
                                <header className="card-header">
                                </header>
                                <p className="card-header-title">Find players</p>
                                <div className="card-content">
                                    <div className="content">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>You need to be logged in to view this page!</p>
            )}
        </div>
    );
}