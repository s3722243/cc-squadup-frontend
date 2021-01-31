import GamesTable from "./GamesTable";
import useAxios from "axios-hooks";
import useCurrentUser from "../hooks/UseCurrentUser";
import {useEffect, useState} from "react";

export default function RecentlyPlayedGames(props) {
    const currentUser = useCurrentUser();
    const [finalData, setFinalData] = useState(null);
    const [finalLoading, setFinalLoading] = useState(true);
    const [{data: historyData}, executeHistory] = useAxios(
        {
            baseURL: "https://wd2gypcbr9.execute-api.us-east-1.amazonaws.com/test/history",
            transformResponse: [function (data) {
                let uniqueGames = new Set();

                return JSON.parse(data)
                    .sort((a, b) => {
                        let aDate = new Date(a.dayPlayed);
                        let bDate = new Date(b.dayPlayed);
                        return (aDate < bDate) ? 1 : ((bDate < aDate) ? -1 : 0);
                    })
                    .filter(record => {
                        if (uniqueGames.has(record.gamePlayed)) {
                            return false;
                        } else {
                            uniqueGames.add(record.gamePlayed);
                            return true;
                        }
                    });
            }],
        },
        {manual: true}
    );
    const [, executeDetail] = useAxios(
        {
            baseURL: "https://api.rawg.io/api/games",
            params: {
                key: "ef019ffe0a864817afdc4a0e88916144",
            },
        },
        {manual: true}
    );

    useEffect(() => {
            if (currentUser) {
                executeHistory({
                    url: `/${currentUser.getUsername()}`
                });
            }
        }, [currentUser, executeHistory]
    );

    useEffect(() => {
        async function retrieveDetails() {
            if (historyData) {
                setFinalLoading(true);
                console.log(`Starting: ${JSON.stringify(historyData)}`);
                let index = 0;
                for (const record of historyData) {
                    console.log(`Attempting: ${record.gamePlayed}`);
                    try {
                        let details = await executeDetail({
                            url: `/${record.gamePlayed}`
                        });
                        historyData[index] = {...historyData[index], ...details.data};
                    } catch (error) {
                        console.log(`Inside error: ${error}`);
                    }

                    ++index;
                }
                setFinalData(historyData);
                setFinalLoading(false);
            }
        }

        retrieveDetails();
    }, [historyData, executeDetail]);

    return (
        <div className="card mt-3">
            <header className="card-header">
                <p className="card-header-title">Recently played games</p>
            </header>
            <div className="card-table">
                <div className="content">
                    {finalLoading ?
                        <div className="m-3">
                            <progress className="progress is-medium is-dark" max="100"/>
                        </div> :
                        (finalData != null && finalData.length > 0 ?
                                <GamesTable selectedCallback={props.selectedCallback} data={finalData}/> :
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