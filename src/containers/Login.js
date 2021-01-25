import {useState} from "react";
import {useForm} from "react-hook-form";
import {Auth} from "@aws-amplify/auth"
import {useHistory} from 'react-router-dom'
import useCurrentUser from "../hooks/UseCurrentUser";


export default function Login() {
    const currentUser = useCurrentUser();
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const [failedMessage, setFailedMessage] = useState(null);
    const {register, handleSubmit, errors} = useForm();

    async function onSubmit(input) {
        setLoading(true);
        try {
            await Auth.signIn(input.username, input.password);
            console.log("Logged in!");
            history.push("/find");

        } catch (e) {
            console.log("An error occurred logging in:" + JSON.stringify(e));
            setFailedMessage(e.message);

        }
        setLoading(false);
    }

    return (
        <div className="container">
            <h3 className="title is-3">Login</h3>
            {currentUser ? (
                <p>You're already logged in as {currentUser.getUsername()}</p>
            ) : (
                <div className="card events-card">
                    <div className="card-content">
                        <div className="content">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="field">
                                    <label className="label">E-mail or SquadUp username</label>
                                    <div className="control">
                                        <input className={`input ${errors.username ? "is-danger" : ""}`} type="text"
                                               name="username"
                                               ref={register({required: "Your username or e-mail is required!"})}/>
                                        {errors.username &&
                                        <div className="help is-danger">{errors.username.message}</div>}
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">
                                        <input className={`input ${errors.password ? "is-danger" : ""}`} type="password"
                                               name="password"
                                               ref={register({required: "Your password is required!"})}/>
                                        {errors.password &&
                                        <div className="help is-danger">{errors.password.message}</div>}
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <button
                                            className={`button is-primary ${isLoading ? "is-loading" : ""}`}
                                            disabled={isLoading}
                                        >
                                            <span>Login</span>
                                        </button>
                                    </div>
                                </div>
                                {failedMessage &&
                                <div className="notification is-light is-danger">{failedMessage}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}