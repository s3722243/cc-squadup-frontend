export default function FindPlayersDialog(props) {


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
                                <div>
                                    <div className="hero" style={{
                                        backgroundImage: `url(${props.selectedGame.background_image})`,
                                        // maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%)",
                                        WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0) 0%,rgba(1,1,1,1) 100%",
                                        minHeight: "256px",
                                        // maxWidth: "256px",
                                        objectFit: "cover",
                                        // width: "500px",
                                        // height: "250px",
                                        backgroundSize: "cover",
                                        // lineHeight: "230px",
                                        textAlign: "left",
                                        // borderRadius: "10px",
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

                            </div> :
                            "Select a game to get started!"
                    }

                </div>
            </div>
        </div>
    );
}