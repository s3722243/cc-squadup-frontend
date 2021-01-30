import useCurrentUser from "../hooks/UseCurrentUser";
import RecentlyPlayedGames from "./RecentlyPlayedGames";
import PopularGames from "./PopularGames";
import SearchGames from "./SearchGames";
import FindPlayersDialog from "./FindPlayersDialog";
import {useState} from "react";

export default function Find() {
    const currentUser = useCurrentUser();
    const [selectedGame, setSelectedGame] = useState(null);

    function selectGame(game) {
        console.log(game.id);
        setSelectedGame(game);
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
                            <FindPlayersDialog selectedGame={selectedGame}/>
                        </div>
                    </div>
                </div>
            ) : (
                <p>You need to be logged in to view this page!</p>
            )}
        </div>
    );
}