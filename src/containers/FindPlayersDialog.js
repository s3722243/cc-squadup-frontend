import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import useAxios from "axios-hooks";
import useCurrentUser from "../hooks/UseCurrentUser";

export default function FindPlayersDialog(props) {
    const currentUser = useCurrentUser();
    const {register, handleSubmit, errors} = useForm({shouldUnregister: false});
    const [isLoading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [actualSelectedGame, setActualSelectedGame] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [{data, error}, execute] = useAxios(
        {
            url: "https://wd2gypcbr9.execute-api.us-east-1.amazonaws.com/test/findmatch",
            method: "post",
            transformResponse: ((data) => {
                console.log("transform: " + data);
                return JSON.parse(data).users;
            }),
        },
        {manual: true}
    );

    useEffect(() => {
        if (!isLoading) {
            setActualSelectedGame(props.selectedGame);
        }

        setShowResults(false);
    }, [props.selectedGame]);

    async function onSubmit(input) {
        setShowResults(false);
        setCount(0);
        setLoading(true);

        let retryCount = 0;

        while (retryCount < 3) {
            try {
                let response = await execute({
                    data: {
                        username: currentUser.getUsername(),
                        game_id: actualSelectedGame.id.toString(),
                        playersNeeded: input.players,
                        console: input.platform,
                        region: input.region === "" ? null : input.region
                    }
                });

                console.log("response: " + JSON.stringify(response));

                if (response.data.length > 0) {
                    console.log("success: " + response.data);
                    retryCount = Number.MAX_SAFE_INTEGER;
                } else {
                    console.log("empty: " + response.data);
                    ++retryCount;
                }
            } catch (e) {
                console.log("failed 500: " + e);
                ++retryCount;
            }
        }

        setShowResults(true);
        setLoading(false);
        setCount(0);
    }

    /**
     * Source: https://stackoverflow.com/a/57137212
     */
    useEffect(() => {
        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
            setCount(count + 1);
        }, 1000);

        // clear interval on re-render to avoid memory leaks
        return () => {
            clearInterval(intervalId)
        };
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
    }, [count]);


    return (
        <div className="card">
            <header className="card-header">
            </header>
            <p className="card-header-title">Find players</p>
            <div className="card-content">
                <div className="content">
                    {
                        actualSelectedGame ?
                            <div>
                                <div style={{position: "relative"}}>
                                    <div className="hero" style={{
                                        backgroundImage: `url(${actualSelectedGame.background_image})`,
                                        maskImage: "linear-gradient(to top, rgba(0,0,0,0) 0%,rgba(1,1,1,1) 100%",
                                        WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0) 0%,rgba(1,1,1,1) 100%",
                                        minHeight: "256px",
                                        objectFit: "cover",
                                        backgroundSize: "cover",
                                        textAlign: "left",
                                        position: "relative",
                                    }}>
                                    </div>
                                    <span className="title is-2" style={{
                                        position: "absolute",
                                        bottom: "15%",
                                        left: "5%",
                                    }}>
                                        {actualSelectedGame.name}
                                    </span>
                                </div>
                                <div className="columns">
                                    <div className="column is-4">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="field">
                                                <label className="label">Platform</label>
                                                <div className="control">
                                                    <div
                                                        className={`select is-fullwidth ${errors.platform ? "is-danger" : ""}`}>
                                                        <select
                                                            name="platform"
                                                            ref={register({required: `You must select a platform!`})}
                                                            defaultValue="">
                                                            <option value="" disabled>Select a platform</option>
                                                            {actualSelectedGame.platforms.map((platform) =>
                                                                <option
                                                                    key={platform.platform.id}
                                                                    value={platform.platform.id}
                                                                >
                                                                    {platform.platform.name}
                                                                </option>
                                                            )}
                                                        </select>
                                                    </div>
                                                    {errors.platform &&
                                                    <div className="help is-danger">{errors.platform.message}</div>}
                                                </div>
                                            </div>

                                            <div className="field">
                                                <label className="label">No. of players</label>
                                                <div className="control">
                                                    <input
                                                        name="players"
                                                        type="number"
                                                        className={`input ${errors.players ? "is-danger" : ""}`}
                                                        ref={register({
                                                            pattern: {
                                                                value: /[0-9]*/,
                                                                message: "You must enter a valid number between 2 and 10!",
                                                            },
                                                            min: {
                                                                value: 2,
                                                                message: "You must enter a valid number between 2 and 10!",
                                                            },
                                                            max: {
                                                                value: 10,
                                                                message: "You must enter a valid number between 2 and 10!",
                                                            },
                                                            required: `You must select the number of players!`,
                                                            valueAsNumber: true
                                                        })}
                                                        defaultValue="">
                                                    </input>
                                                    {errors.players &&
                                                    <div className="help is-danger">{errors.players.message}</div>}
                                                </div>
                                            </div>

                                            <div className="field">
                                                <label className="label">Region (optional)</label>
                                                <div className="control">
                                                    <div
                                                        className={`select is-fullwidth ${errors.region ? "is-danger" : ""}`}>
                                                        <select
                                                            name="region"
                                                            defaultValue="">
                                                            <option value="" disabled>Select a region</option>
                                                            {["Americas", "Asia", "Europe", "Oceania", "South-East Asia"].map((region) =>
                                                                <option key={region} value={region}>
                                                                    {region}
                                                                </option>
                                                            )}
                                                        </select>
                                                    </div>
                                                    {errors.region &&
                                                    <div className="help is-danger">{errors.region.message}</div>}
                                                </div>
                                            </div>
                                            <div className="field">
                                                <div className="control">
                                                    <button
                                                        className={`button is-primary ${isLoading ? "is-loading" : ""}`}
                                                        disabled={isLoading}
                                                    >
                                                        <span>Find players</span>
                                                    </button>
                                                    {isLoading &&
                                                    <p className="ml-3 title is-6 has-text-grey is-inline">
                                                        Searching ({count})...
                                                    </p>
                                                    }
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="column is-8">
                                        {!isLoading && showResults &&
                                        <div className="box mt-3">
                                            {data && data.length > 0 ?
                                                <>
                                                    <h1 className="title is-4">Found players!</h1>
                                                    {data.map((username) => <p>{username}</p>)}
                                                </> :
                                                <h1 className="title is-4">Could not find players!</h1>
                                            }
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div> :
                            <div className="m-3 has-text-centered ">
                                <p className="title is-6 has-text-grey">Select a game to get started!</p>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}