import GamesTable from "./GamesTable";

export default function RecentlyPlayedGames(props) {

    const data = [
        // {
        //     id: 1,
        //     name: "first",
        //     background_image: "https://media.rawg.io/media/games/b11/b11127b9ee3c3701bd15b9af3286d20e.jpg"
        // },
        // {
        //     id: 2,
        //     name: "second",
        //     background_image: "https://media.rawg.io/media/games/b11/b11127b9ee3c3701bd15b9af3286d20e.jpg"
        // }
    ]

    return (
        <div className="card mt-3">
            <header className="card-header">
                <p className="card-header-title">Recently played games</p>
            </header>
            <div className="card-table">
                <div className="content">
                    {data.length === 0 ?
                        <div className="m-3 has-text-centered ">
                            <p className="title is-6 has-text-grey">You haven't played any games yet!</p>
                        </div> :
                        <GamesTable selectedCallback={props.selectedCallback} data={data}/>
                    }
                </div>
            </div>
        </div>
    );
}