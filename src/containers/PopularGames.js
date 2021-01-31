import GamesTable from "./GamesTable";
import useAxios from "axios-hooks";

export default function PopularGames(props) {
    const [{data, loading}] = useAxios(
        {
            url: "https://api.rawg.io/api/games/lists/main",
            params: {
                key: "ef019ffe0a864817afdc4a0e88916144",
                ordering: "relevance"
            },
            transformResponse: [function (data) {
                return JSON.parse(data).results.map((game) => {
                    return new Date(game.released) <= new Date() ? game : null;
                }).filter(Boolean);
            }]
        }
    )

    return (
        <div className="card mt-3">
            <header className="card-header">
                <p className="card-header-title">Popular games</p>
            </header>
            <div className="card-table">
                <div className="content">
                    {loading ?
                        <div className="m-3">
                            <progress className="progress is-medium is-dark" max="100"/>
                        </div> :
                        (data != null && data.length > 0 ?
                                <GamesTable selectedCallback={props.selectedCallback} data={data}/> :
                                <div className="m-3 has-text-centered ">
                                    <p className="title is-6 has-text-grey">Could not find any games!</p>
                                </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}