import {useState} from "react";
import {useForm} from "react-hook-form";
import {Auth} from "@aws-amplify/auth"
import {Link} from 'react-router-dom'
import useCurrentUser from "../hooks/UseCurrentUser";
import UserUtils from "../util/UserUtils";
import {UserAvailability} from "../model/UserAvailability";


export default function Register() {
    const currentUser = useCurrentUser();
    const [isLoading, setLoading] = useState(false);
    const [displayContent, setDisplayContent] = useState("SIGNUP");
    const [failedMessage, setFailedMessage] = useState(null);
    const [username, setUsername] = useState(null);

    const {register, handleSubmit, errors, watch} = useForm();

    async function onSubmit(input) {
        setLoading(true);

        let usernameAvailability = await UserUtils.determineUserExists(input.username);
        let emailAvailability = await UserUtils.determineUserExists(input.email);
        if (usernameAvailability === UserAvailability.AVAILABLE
            && emailAvailability === UserAvailability.AVAILABLE) {
            try {
                await Auth.signUp({
                    username: input.username,
                    password: input.password,
                    attributes: {email: input.email}
                });
                setUsername(input.username);
                console.log("Signed up!");
                setDisplayContent("CONFIRM");

            } catch (e) {
                console.log("An error occurred signing up:" + JSON.stringify(e));
                setFailedMessage(e.message);
            }

        } else if (usernameAvailability === UserAvailability.REQUIRES_VERIFICATION) {
            try {
                await Auth.resendSignUp(input.username);
                setUsername(input.username);
                setDisplayContent("CONFIRM");

            } catch (e) {
                console.log("An error occurred resending sign-up code:" + JSON.stringify(e));
                setFailedMessage(e.message);
            }

        } else {
            setFailedMessage(UserAvailability.NOT_AVAILABLE);
        }
        setLoading(false);
    }

    async function onConfirmSubmit(input) {
        setLoading(true);

        try {
            await Auth.confirmSignUp(username, input.confirmationCode, {forceAliasCreation: false});
            setDisplayContent("SUCCESS");
        } catch (e) {
            console.log("An error occurred confirming:" + JSON.stringify(e));
            setFailedMessage(e.message);
        }
        setLoading(false);
    }

    function createFormField(label, name, type, errorMessage, errorField, additionalRegisterAttributes = null) {

        let registerAttributes = {required: errorField};
        if (additionalRegisterAttributes !== null) {
            registerAttributes = {...registerAttributes, ...additionalRegisterAttributes};
        }

        return <div className="field">
            <label className="label">{label}</label>
            <div className="control">
                <input className={`input ${errorMessage ? "is-danger" : ""}`} type={type}
                       name={name}
                       ref={register(registerAttributes)}/>
                {errorMessage &&
                <div className="help is-danger">{errorMessage.message}</div>}
            </div>
        </div>;
    }

    function getSignUpForm() {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                {createFormField("Create a SquadUp username", "username", "text", errors.username, "A username is required!")}
                {createFormField("Enter your e-mail", "email", "text", errors.email, "An e-mail is required!", {
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "A valid e-mail address is required!",
                    }
                })}
                {createFormField("Create your password", "password", "password", errors.password, "A password is required!")}
                {createFormField(
                    "Confirm your password",
                    "confirmPassword",
                    "password",
                    errors.confirmPassword,
                    "Your password confirmation is required!",
                    {validate: (value) => value === watch('password')}
                )}
                <div className="field">
                    <div className="control">
                        <button
                            className={`button is-primary ${isLoading ? "is-loading" : ""}`}
                            disabled={isLoading}
                        >
                            <span>Register</span>
                        </button>
                    </div>
                </div>
                {failedMessage &&
                <div className="notification is-light is-danger">{failedMessage}</div>}
            </form>
        );
    }

    function getConfirmForm() {
        return (
            <div>
                <p>A verification code was sent to your e-mail.</p>
                <form onSubmit={handleSubmit(onConfirmSubmit)}>
                    {createFormField("Enter your verification code", "confirmationCode", "text", errors.confirmationCode, "Your verification code is required!")}
                    <div className="field">
                        <div className="control">
                            <button
                                className={`button is-primary ${isLoading ? "is-loading" : ""}`}
                                disabled={isLoading}
                            >
                                <span>Confirm</span>
                            </button>
                        </div>
                    </div>
                    {failedMessage &&
                    <div className="notification is-light is-danger">{failedMessage}</div>}
                </form>
            </div>
        );
    }

    function determineDisplay() {
        let display;
        switch (displayContent) {
            case "SIGNUP":
                display = getSignUpForm();
                break;
            case "CONFIRM":
                display = getConfirmForm();
                break;
            case "SUCCESS":
                display = <p>You're e-mail has been verified! Please proceed to <Link to={"/login"}>login</Link></p>
                break;
            default:
                console.log("Unknown ")
                display = <p>An unexpected error occurred.</p>
        }

        return display;
    }

    return (
        <div className="container">
            <h3 className="title is-3">Register</h3>
            {currentUser ? (
                <p>You're already logged in as {currentUser.getUsername()}</p>
            ) : (
                <div className="card events-card">
                    <div className="card-content">
                        <div className="content">
                            {determineDisplay()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}