import {useMemo} from "react";
import Table from "./Table";

export default function RecentlyPlayedGames(props) {
    const columns = useMemo(() => [
            {
                "Header": "Name",
                "accessor": "name",
                "show": false,
                Cell: (cell) => (
                    <div className="columns is-vcentered">
                        <div className="column is-6  is-centered">
                            <figure className="image is-256x256"
                            >
                                <img src={cell.row.original.background_image} alt="game" style={{
                                    // maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%)",
                                    // WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%",
                                    maxHeight: "256px",
                                    maxWidth: "256px",
                                    objectFit: "cover"
                                }}/>
                            </figure>
                        </div>
                        <div className="column is-4 is-left">
                            <p className="title is-4">{cell.row.original.name}</p>
                        </div>
                        <div className="column is-2" style={{display: "flex"}}>
                            <button className="button" onClick={() => props.selectedCallback(cell.row.original)}>
                                <span className="icon is-large has-text-grey">
                                    <i className="fas fa-3x fa-caret-right"/>
                                </span>
                            </button>
                        </div>
                    </div>
                )
            }
        ],
        [props]
    );


    const data = [
        {
            id: 1,
            name: "first",
            background_image: "https://media.rawg.io/media/games/b11/b11127b9ee3c3701bd15b9af3286d20e.jpg"
        },
        {
            id: 2,
            name: "second",
            background_image: "https://media.rawg.io/media/games/b11/b11127b9ee3c3701bd15b9af3286d20e.jpg"
        }
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
                            <p className="title is-4 has-text-grey">You haven't played any games yet!</p>
                        </div> :
                        <Table columns={columns} data={data}/>
                    }
                </div>
            </div>
        </div>
    );
}