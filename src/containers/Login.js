import {useState} from "react";
import {useForm} from "react-hook-form";
import {Auth} from "@aws-amplify/auth"
import { useHistory } from 'react-router-dom'


export default function Login() {
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const {register, handleSubmit, errors} = useForm();

    async function onSubmit(input) {
        setLoading(true);
        try {
            await Auth.signIn(input.username, input.password);
            console.log("Logged in!")
            history.push("/")

        } catch (e) {
            console.log("An error occurred logging in:" + e)
        }
        setLoading(false);
    }

    return (
        <div className="container">
            <h3 className="title is-3">Login</h3>
            <div className="card events-card">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="field">
                                <label className="label">SquadUp username</label>
                                <input className="input" type="text" name="username" ref={register({required: "Your username is required!"})}/>
                                <label className="label">Password</label>
                                <input className="input" type="password" name="password"
                                       ref={register({required: "Your password is required!"})}/>
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button
                                            className={`button is-link ${isLoading ? "is-loading" : ""}`}
                                            disabled={isLoading}
                                        >
                                            <span>Login</span>
                                        </button>
                                    </div>
                                </div>
                                {errors.username && <div className="notification is-danger">{errors.username.message}</div>}
                                {errors.password && <div className="notification is-danger">{errors.password.message}</div>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}