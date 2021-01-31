import useCurrentUser from "../hooks/UseCurrentUser";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import useAxios from "axios-hooks";
import {icons} from "../util/Icons";

export default function Profile() {
    const currentUser = useCurrentUser();
    const [isLoading, setLoading] = useState(false);
    const [failedMessage, setFailedMessage] = useState(null);
    const [changed, setChanged] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const {register, handleSubmit} = useForm();
    const [{response: saveResponse}, executeSaveUser] = useAxios(
        {
            url: "https://wd2gypcbr9.execute-api.us-east-1.amazonaws.com/test/saveuser",
            method: "post",
        },
        {manual: true}
    );
    const [{data: retrieveData, loading: retrieveLoading}, executeRetrieve] = useAxios(
        {
            baseURL: "https://wd2gypcbr9.execute-api.us-east-1.amazonaws.com/test/retrieve-player-info/",
        },
        {manual: true}
    );

    useEffect(() => {
        if (currentUser) {
            console.log("Executing retrieve...");
            executeRetrieve({url: `/${currentUser.getUsername()}`});
        }
    }, [currentUser, executeRetrieve, saveResponse]);

    async function onSubmit(input) {
        setLoading(true);
        try {
            // Remove empty values
            let d = Object.fromEntries(Object.entries({
                username: currentUser.getUsername(),
                ...input
            }).filter(([_, v]) => v !== ""));

            console.log("Executing save..." + JSON.stringify(d));

            await executeSaveUser({
                data: d
            });
            setFailedMessage(null);
            setSuccessMessage("Your details were successfully updated");
            setChanged(false);

        } catch (e) {
            console.log("An error occurred retrieving:" + JSON.stringify(e));
            setSuccessMessage(null);
            setFailedMessage("An error occurred updating your details");
        }
        setLoading(false);
    }

    const profileInput = ({label, identifier, iconClass, content}) => {
        return <div className="field">
            <label className="label">{label}</label>
            <div className="control has-icons-left">
                <input className="input"
                       type="text"
                       name={identifier}
                       ref={register}
                       key={identifier}
                       defaultValue={retrieveData ? retrieveData[identifier] : null}
                       onChange={() => setChanged(true)}
                       disabled={isLoading || retrieveLoading}
                />
                <span className="icon is-left"><i className={iconClass} data-char-content={content}/></span>
            </div>
        </div>;
    };

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="title">Profile</h1>
                <hr/>

            </header>
            {currentUser ? (
                <div className="container mt-3">
                    <div className="card events-card">
                        <div className="card-content">
                            <div className="content">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <p>You can view and update any information that will be shared with other players
                                        when you match with them!</p>
                                    <div className="field">
                                        <label className="label">SquadUp username</label>
                                        <div className="control">
                                            <input className="input" type="text" name="username"
                                                   value={currentUser.getUsername()} disabled
                                            />
                                        </div>
                                    </div>
                                    {profileInput(icons.discord)}
                                    {profileInput(icons.playstation)}
                                    {profileInput(icons.xbox)}
                                    {profileInput(icons.switch)}
                                    {profileInput(icons.steam)}
                                    {profileInput(icons.epic)}
                                    {profileInput(icons.battle)}
                                    <div className="field">
                                        <div className="control">
                                            <button
                                                className={`button is-primary ${isLoading || retrieveLoading ? "is-loading" : ""}`}
                                                disabled={isLoading || !changed || retrieveLoading}
                                            >
                                                <span>Save changes</span>
                                            </button>
                                        </div>
                                    </div>
                                    {failedMessage &&
                                    <div className="notification is-light is-danger">{failedMessage}</div>}
                                    {successMessage &&
                                    <div className="notification is-light is-success">{successMessage}</div>}
                                </form>
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