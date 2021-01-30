import {useForm} from "react-hook-form";
import {forwardRef, useState} from "react";

export default function FindPlayersDialog(props) {
    const {register, handleSubmit, errors} = useForm();
    const [isLoading, setLoading] = useState(false);

    async function onSubmit(input) {

    }

    const Select = forwardRef(({label, identifier, createOptions}, ref) => (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control">
                <div className={`select ${errors[identifier] ? "is-danger" : ""}`}>
                    <select
                        name={identifier}
                        ref={ref}
                        defaultValue="">
                        <option value="" disabled>Select a {identifier}</option>
                        {createOptions()}
                    </select>
                </div>
                {errors[identifier] &&
                <div className="help is-danger">{errors[identifier].message}</div>}
            </div>
        </div>
    ));

    return (
        <div className="card">
            <header className="card-header">
            </header>
            <p className="card-header-title">Find players</p>
            <div className="card-content">
                <div className="content">
                    {
                        props.selectedGame ?
                            <div>
                                <div style={{position: "relative"}}>
                                    <div className="hero" style={{
                                        backgroundImage: `url(${props.selectedGame.background_image})`,
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
                                        {props.selectedGame.name}
                                    </span>
                                </div>
                                <div className="columns">
                                    <div className="column is-4">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <Select label="Platform" identifier="platform" createOptions={() =>
                                                props.selectedGame.platforms.map((platform) =>
                                                    <option key={platform.platform.id} value={platform.platform.id}>
                                                        {platform.platform.name}
                                                    </option>
                                                )
                                            } ref={register({required: `You must select a platform!`})}/>
                                            <Select label="Region" identifier="region" createOptions={() =>
                                                ["Americas", "Asia", "Europe", "Oceania", "South-East Asia"].map((region) =>
                                                    <option key={region} value={region}>
                                                        {region}
                                                    </option>
                                                )
                                            }/>
                                            <div className="field">
                                                <div className="control">
                                                    <button
                                                        className={`button is-primary ${isLoading ? "is-loading" : ""}`}
                                                        disabled={isLoading}
                                                    >
                                                        <span>Find players</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="column is-8">
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