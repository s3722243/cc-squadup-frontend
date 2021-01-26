import useAxios from "axios-hooks";
import {useEffect, useState} from "react";
import GamesTable from "./GamesTable";

export default function SearchGames(props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [{data, loading}, execute] = useAxios(
        {
            url: "https://api.rawg.io/api/games",
            transformResponse: [function (data) {
                return JSON.parse(data).results;
            }]
        },
        {manual: true}
    );

    useEffect(
        () => {
            const timeOutId = setTimeout(() => {
                if (searchQuery) {
                    execute({
                        params: {
                            key: "2b40908800ad4989923c71fab96f88af",
                            search: searchQuery,

                        }
                    });
                } else {

                }
            }, 750);
            return () => clearTimeout(timeOutId);
        }, [searchQuery, execute]
    );

    return (
        <div className="card">
            <div className="card-content">
                <div className="content">
                    <div className="control has-icons-left">
                        <input className="input"
                               type="text"
                               value={searchQuery}
                               onChange={event => setSearchQuery(event.target.value)}
                               placeholder="Search games"
                        />
                        <span className="icon is-left"><i className="fa fa-search"/></span>
                    </div>
                </div>
            </div>
            <div className="card-table">
                <div className="content">
                    {loading ?
                        <div className="m-3">
                            <progress className="progress is-medium is-dark" max="100"/>
                        </div> :
                        (searchQuery ?
                                (data != null && data.length > 0 ?
                                    <GamesTable selectedCallback={props.selectedCallback} data={data}/> :
                                    <div className="m-3 has-text-centered ">
                                        <p className="title is-6 has-text-grey">Unable to find any games with {searchQuery}</p>
                                    </div>) :
                                ""
                        )
                    }
                </div>
            </div>
        </div>

    );
}