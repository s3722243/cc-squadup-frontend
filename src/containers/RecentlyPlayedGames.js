import GamesTable from "./GamesTable";
import useAxios from "axios-hooks";
import useCurrentUser from "../hooks/UseCurrentUser";
import {useEffect} from "react";

export default function RecentlyPlayedGames(props) {
    const currentUser = useCurrentUser();
    const [{data: historyData, loading: historyLoading}, executeHistory] = useAxios(
        {
            baseURL: "https://aybxaw98mk.execute-api.us-east-1.amazonaws.com/dev/retrieve-player-info/",
            transformResponse: [function (data) {
                return JSON.parse(data).sort((a, b) => {
                    let aDate = new Date(a.dayPlayed);
                    let bDate = new Date(b.dayPlayed);
                    return (aDate > bDate) ? 1 : ((bDate > aDate) ? -1 : 0);
                })
            }],
        },
        {manual: true}
    );
    const [{data: detailData, loading: detailLoading}, executeDetail] = useAxios(
        {
            baseURL: "https://api.rawg.io/api/games",
            transformResponse: [function (data) {
                return JSON.parse(data).results;
            }]
        },
        {manual: true}
    );


    useEffect(() => {
            if (currentUser) {
                executeHistory({
                    url: `/Darknight091`
                });
            }
        }, [currentUser, executeHistory]
    );

    useEffect(() => {
        console.log(`Yay: ${JSON.stringify(historyData)}`);
    }, [historyData]);

    return (
        <div className="card mt-3">
            <header className="card-header">
                <p className="card-header-title">Recently played games</p>
            </header>
            <div className="card-table">
                <div className="content">
                    {historyLoading ?
                        <div className="m-3">
                            <progress className="progress is-medium is-dark" max="100"/>
                        </div> :
                        (historyData != null && historyData.length > 0 ?
                                <GamesTable selectedCallback={props.selectedCallback} data={historyData}/> :
                                <div className="m-3 has-text-centered ">
                                    <p className="title is-6 has-text-grey">You haven't played any games yet!</p>
                                </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}