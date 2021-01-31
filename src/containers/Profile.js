import useCurrentUser from "../hooks/UseCurrentUser";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import useAxios from "axios-hooks";

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
    const [{data: retrieveData}, executeRetrieve] = useAxios(
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
                       disabled={isLoading}
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
                                    {profileInput({
                                        label: "Discord username/tag",
                                        identifier: "discord",
                                        iconClass: "fab fa-discord"
                                    })}
                                    {profileInput({
                                        label: "Playstation username",
                                        identifier: "playstation",
                                        iconClass: "fab fa-playstation"
                                    })}
                                    {profileInput({
                                        label: "Xbox gamertag",
                                        identifier: "xbox",
                                        iconClass: "fab fa-xbox"
                                    })}
                                    {profileInput({
                                        label: "Nintendo Switch friend code",
                                        identifier: "switch",
                                        iconClass: "fas pf-char fa-fw",
                                        content: "N"
                                    })}
                                    {profileInput({
                                        label: "Steam username",
                                        identifier: "steam",
                                        iconClass: "fab fa-steam"
                                    })}
                                    {profileInput({
                                        label: "Epic games username",
                                        identifier: "epic",
                                        iconClass: "fas pf-char fa-fw",
                                        content: "E"
                                    })}
                                    {profileInput({
                                        label: "Battle.net BattleTag", identifier: "battle",
                                        iconClass: "fab fa-battle-net"
                                    })}
                                    <div className="field">
                                        <div className="control">
                                            <button
                                                className={`button is-primary ${isLoading ? "is-loading" : ""}`}
                                                disabled={isLoading || !changed}
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