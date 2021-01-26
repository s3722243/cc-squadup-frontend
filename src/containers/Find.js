import useCurrentUser from "../hooks/UseCurrentUser";
import RecentlyPlayedGames from "./RecentlyPlayedGames";
import PopularGames from "./PopularGames";
import SearchGames from "./SearchGames";

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
                            <SearchGames selectedCallback={selectGame}/>
                            <RecentlyPlayedGames selectedCallback={selectGame}/>
                            <PopularGames selectedCallback={selectGame}/>
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